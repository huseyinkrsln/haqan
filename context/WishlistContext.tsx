"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/lib/data";

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "LOAD"; payload: Product[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.items.find((i) => i.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "LOAD":
      return { items: action.payload };
    default:
      return state;
  }
}

interface WishlistContextValue {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleItem: (product: Product) => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("haqan-wishlist");
      if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("haqan-wishlist", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product) =>
    dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const isWishlisted = (id: string) =>
    state.items.some((i) => i.id === id);
  const toggleItem = (product: Product) =>
    isWishlisted(product.id) ? removeItem(product.id) : addItem(product);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        isWishlisted,
        toggleItem,
        totalItems: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
