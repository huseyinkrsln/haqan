import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

// Dinamik Backend URL Çözümleyici:
// Tarayıcıdaysa (PC veya Mobil), istemcinin girdiği hostname'i (örn: 192.168.1.108 veya localhost) alarak port 5000'e yönlendirir.
export function getBackendUrl(): string {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return `http://${hostname}:5000`;
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://localhost:5000";
}

export const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Refresh Token Queue (Mutex) ──────────────────────────────────────────────
let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token!);
    }
  });
  failedQueue = [];
}

let cachedSession: any = null;
let lastSessionFetch = 0;
const SESSION_CACHE_TTL = 60 * 1000; // 1 dakika

async function getCachedSession() {
  const now = Date.now();
  if (cachedSession !== null && now - lastSessionFetch < SESSION_CACHE_TTL) {
    return cachedSession;
  }
  try {
    cachedSession = await getSession();
    lastSessionFetch = now;
  } catch {
    cachedSession = null;
  }
  return cachedSession;
}

// ─── Request Interceptor ──────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = getBackendUrl();

    try {
      const session = await getCachedSession();
      const token = (session as any)?.accessToken || (session as any)?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// PascalCase -> camelCase Dönüştürücü
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && typeof obj === "object" && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

// ─── Response Interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("auth/refresh-token")
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();
        const refreshToken = (session as any)?.refreshToken;

        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(
          `${getBackendUrl()}/api/v1/auth/refresh-token`,
          { refreshToken }
        );

        const newAccessToken: string = data?.data?.token || data?.token;
        if (!newAccessToken) throw new Error("Invalid refresh response");

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await signOut({ redirect: false });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
