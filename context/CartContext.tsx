"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string; color: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; size: string; color: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.payload.id}-${action.payload.size}-${action.payload.color}`;
      const existingIndex = state.items.findIndex(
        (i) =>
          `${i.id}-${i.size}-${i.color}` === key
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM": {
      const key = `${action.payload.id}-${action.payload.size}-${action.payload.color}`;
      return {
        items: state.items.filter(
          (i) => `${i.id}-${i.size}-${i.color}` !== key
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      const key = `${action.payload.id}-${action.payload.size}-${action.payload.color}`;
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => `${i.id}-${i.size}-${i.color}` !== key
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          `${i.id}-${i.size}-${i.color}` === key
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("haqan-cart");
      if (saved) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("haqan-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string, size: string, color: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } });
  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, color, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
