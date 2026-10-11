"use client";

import React, { createContext, useContext, useMemo } from "react";
import { Book, CartItem } from "./types";
import useLocalStorage from "@/components/hooks/use-localstorage";

export interface CartContextType {
  cart: CartItem[];
  cartTotalCount: number;
  subtotal: number;
  addToCart: (params: { book: Book; quantity?: number }) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("bookworm_cart", []);

  const addToCart = ({
    book,
    quantity = 1,
  }: {
    book: Book;
    quantity?: number;
  }) => {
    const existing = cart.find((item) => item.book.id === book.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      return;
    }

    setCart([...cart, { book, quantity }]);
  };

  const removeFromCart = (bookId: number) => {
    const data = cart.filter((item) => item.book.id !== bookId);
    setCart(data);
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      const data = cart.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item,
      );
      setCart(data);
    }
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (item.book.price || 0) * item.quantity,
        0,
      ),
    [cart],
  );

  const cartTotalCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
