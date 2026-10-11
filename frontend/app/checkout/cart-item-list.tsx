"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import CartItemCard from "./cart-item-card";
import RecommendedBooks from "./recommended-books";

export function CartItemList() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <Card className="py-12 text-center text-muted-foreground p-6">
        <p className="text-sm">Your shopping cart is empty.</p>
        <Link
          href="/books"
          className="inline-block mt-3 text-xs text-primary hover:underline"
        >
          Browse bookstore catalog
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cart.map((item) => (
          <CartItemCard key={item.book.id} item={item} />
        ))}
      </div>
      <RecommendedBooks />
    </div>
  );
}

export default CartItemList;

