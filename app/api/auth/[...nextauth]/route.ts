import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error("Login failed on backend:", res.status, errText);
            return null;
          }

          const result = await res.json();

          if (!result.Success || !result.Data?.Token) {
            return null;
          }

          const { Token, RefreshToken, Expiration, Claims, Roles } = result.Data;

          let fullName = credentials.email;
          let userId: number | undefined = undefined;

          if (Token) {
            try {
              const base64Payload = Token.split(".")[1];
              if (base64Payload) {
                const decodedPayload = JSON.parse(
                  Buffer.from(base64Payload, "base64").toString("utf-8")
                );
                fullName =
                  decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
                  decodedPayload["name"] ||
                  credentials.email;
                const idStr =
                  decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
                  decodedPayload["nameid"] ||
                  decodedPayload["sub"];
                if (idStr) userId = Number(idStr);
              }
            } catch (e) {
              console.error("Token decode error:", e);
            }
          }

          return {
            id: userId ? String(userId) : credentials.email,
            email: credentials.email,
            name: fullName,
            fullName: fullName,
            role: "CUSTOMER",
            roles: Roles || [],
            accessToken: Token,
            refreshToken: RefreshToken,
            expiration: Expiration,
          };
        } catch (error: any) {
          console.error("Auth Exception:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.userId = user.id;
        token.name = user.name;
        token.fullName = user.fullName;
        token.role = user.role;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiration = user.expiration;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        (session.user as any).id = token.id || token.userId;
        (session.user as any).userId = token.id || token.userId;
        (session.user as any).name = token.name || token.fullName;
        (session.user as any).fullName = token.fullName || token.name;
        (session.user as any).role = token.role;
        (session.user as any).roles = token.roles;
      }
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiration = token.expiration;
      return session;
    },
  },

  pages: {
    signIn: "/giris",
    error: "/giris",
  },

  cookies: {
    sessionToken: {
      name: "haqan_store_session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "haqan_store_callback",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "haqan_store_csrf",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 gün
  },
  secret: process.env.NEXTAUTH_SECRET || "haqanwear-customer-secret-key-12345",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
