"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { OrderItem } from "@/lib/types";

export function OrderItemRow({ item }: { item: OrderItem }) {
  const { addToCart } = useCart();
  const cover = item.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f";

  const handleBuyAgain = () => {
    addToCart({
      book: {
        id: item.book_id,
        slug: `book-${item.book_id}`,
        title: item.title,
        author: item.author,
        price: item.price,
        cover_image: cover,
        description: "",
        rating: 5,
        categories: [],
      },
      quantity: 1,
    });
  };

  return (
    <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-20 rounded bg-muted overflow-hidden shrink-0 border">
          <Image
            src={cover}
            alt={item.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <Link
            href={`/book/by-id/${item.book_id}`}
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {item.title}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">{item.author}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Qty: {item.quantity} × ₹{item.price}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-xs h-8"
        onClick={handleBuyAgain}
      >
        <ShoppingBag className="size-3.5 mr-1.5" />
        Buy Again
      </Button>
    </div>
  );
}

export default OrderItemRow;

