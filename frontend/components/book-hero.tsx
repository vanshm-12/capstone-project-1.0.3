"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/types";

interface BookHeroProps {
  book: Book;
}

export function BookHero({ book }: BookHeroProps) {
  const { cart, addToCart } = useCart();
  const inCart = cart.some((item) => item.book.id === book.id);
  const cover =
    book.cover_image ||
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
  const delivery = book.delivery_estimate || "Mon, 21 Jul";

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex gap-4 shrink-0">
        <div className="relative w-52 h-72 rounded-2xl overflow-hidden bg-muted shadow-md border">
          <Image
            src={cover}
            alt={`${book.title} front cover`}
            fill
            priority
            sizes="220px"
            className="object-cover"
          />
        </div>

        <Card className="relative w-52 h-72 rounded-2xl p-4 flex flex-col justify-between text-xs">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              About This Book
            </div>
            <p className="line-clamp-6 text-muted-foreground leading-relaxed">
              {book.detailed_description || book.description}
            </p>
          </div>

          <div className="border-t pt-2 text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">Author:</span>{" "}
            {book.author}
          </div>
        </Card>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {book.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            by{" "}
            <span className="text-foreground font-medium">{book.author}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Published by:{" "}
            <span className="text-foreground font-medium">
              {book.publisher || "ABC Publishers"}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {book.format}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {(book.categories || []).map((c: string) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-foreground">
            ₹{book.price}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Delivery by{" "}
            <span className="font-medium text-foreground">{delivery}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={() => addToCart({ book, quantity: 1 })}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="size-4" />
            {inCart ? "In Cart (Add More)" : "Add to Cart"}
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center gap-8 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px]">
              Language
            </span>
            <span className="text-foreground font-medium capitalize">
              {book.language}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px]">
              Rating
            </span>
            <div className="flex items-center gap-1 text-amber-500 mt-0.5">
              {[...Array(Math.ceil(book.rating))].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3 ${
                    i < Math.floor(book.rating)
                      ? "fill-amber-500 text-amber-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px]">
              Sales
            </span>
            <div className="flex items-center gap-1 text-foreground font-medium">
              <span>{book.sales_count || 100}+ copies sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookHero;
