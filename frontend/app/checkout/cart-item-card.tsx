"use client";

import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";

export function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { book, quantity } = item;

  return (
    <Card className="flex gap-4 p-4">
      <div className="relative w-28 h-40 shrink-0 overflow-hidden rounded-xl bg-muted shadow-sm border">
        <Image
          src={book.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"}
          alt={book.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between text-xs py-0.5">
        <div>
          <h4 className="font-semibold text-foreground text-sm line-clamp-1">
            {book.title}
          </h4>
          <p className="text-muted-foreground text-[11px] mt-0.5">
            by <span>{book.author}</span>
          </p>
          <p className="text-muted-foreground text-[11px] mt-1.5 line-clamp-2">
            {book.description}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 font-medium capitalize">
            {book.format}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {(book.categories || []).map((c: string) => (
              <Badge
                key={c}
                variant="secondary"
                className="text-[10px] px-1.5 py-0"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <div className="text-sm font-bold text-foreground">
            ₹{book.price}
          </div>
          {book.delivery_estimate && (
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Delivery by{" "}
              <span className="font-medium text-foreground">
                {book.delivery_estimate}
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center border rounded-full px-2 py-0.5 gap-2 bg-muted/40">
              <button
                type="button"
                onClick={() => updateQuantity(book.id, quantity - 1)}
                className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="size-3" />
              </button>
              <span className="text-foreground text-xs font-semibold w-4 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(book.id, quantity + 1)}
                className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="size-3" />
              </button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => removeFromCart(book.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Remove item"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItemCard;

