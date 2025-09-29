"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Product } from "@/data/products";

// --- Types ---
type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number } // id
  | { type: "INCREASE_QTY"; payload: number } // id
  | { type: "DECREASE_QTY"; payload: number } // id
  | { type: "CLEAR_CART" };

// Extend context type to include helper methods
type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

// --- Initial state ---
const initialState: CartState = {
  items: [],
};

// --- Reducer ---
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

// --- Context ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Provider ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // --- Helper methods ---
  const addToCart = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (id: number) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const increaseQty = (id: number) => dispatch({ type: "INCREASE_QTY", payload: id });
  const decreaseQty = (id: number) => dispatch({ type: "DECREASE_QTY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --- Custom hook ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
