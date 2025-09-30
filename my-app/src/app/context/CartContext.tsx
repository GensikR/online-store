"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Product } from "@/types";

// --- Cart item type ---
type CartItem = Product & { cartId: string; quantity: number };

// --- State & Actions ---
type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREASE_QTY"; payload: string }
  | { type: "DECREASE_QTY"; payload: string }
  | { type: "CLEAR_CART" };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  increaseQty: (cartId: string) => void;
  decreaseQty: (cartId: string) => void;
  clearCart: () => void;
};

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const cartId = product.id || product.name!;
      const existing = state.items.find((i) => i.cartId === cartId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, cartId, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) };
    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (cartId: string) => dispatch({ type: "REMOVE_ITEM", payload: cartId });
  const increaseQty = (cartId: string) => dispatch({ type: "INCREASE_QTY", payload: cartId });
  const decreaseQty = (cartId: string) => dispatch({ type: "DECREASE_QTY", payload: cartId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
