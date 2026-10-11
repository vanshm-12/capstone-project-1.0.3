"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link
      href={`/book/${book.slug}`}
      className="group flex gap-4 p-3 rounded-2xl border bg-card hover:bg-muted/50 transition-colors"
    >
      <div className="relative w-28 h-40 shrink-0 overflow-hidden rounded-xl bg-muted shadow-sm">
        <Image
          src={book.cover_image}
          alt={book.title}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1 text-xs">
        <div>
          <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            by {book.author}
          </p>
          <p className="text-muted-foreground text-xs mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {book.categories.slice(0, 2).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-[10px] px-1.5 py-0"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-foreground">
              ₹{book.price}
            </span>
            {book.original_price && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{book.original_price}
              </span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">
            Delivery by{" "}
            <span className="font-medium text-foreground">
              {book.delivery_estimate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
