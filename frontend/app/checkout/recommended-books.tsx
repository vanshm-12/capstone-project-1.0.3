"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getBooks } from "@/lib/api/books";
import { Book } from "@/lib/types";
import { BookCard } from "@/components/book-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MAX_RECOMMENDATIONS = 4;

export function RecommendedBooks() {
  const { cart } = useCart();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }

    let cancelled = false;

    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        if (cart.length === 0) {
          return;
        }

        const categories = [
          ...new Set(cart.flatMap((item) => item.book.categories || [])),
        ];
        const authors = [
          ...new Set(
            cart.map((item) => item.book.author).filter(Boolean),
          ),
        ];
        const cartBookIds = new Set(cart.map((item) => item.book.id));

        const requests: Promise<Book[]>[] = [
          ...categories.map((category) =>
            getBooks({ category }, 0, MAX_RECOMMENDATIONS)
              .then((response) => response.content)
              .catch(() => [] as Book[]),
          ),
          ...authors.map((author) =>
            getBooks({ search_query: author }, 0, MAX_RECOMMENDATIONS)
              .then((response) => response.content)
              .catch(() => [] as Book[]),
          ),
        ];

        const results = await Promise.all(requests);

        const seen = new Set<number>();
        const merged: Book[] = [];
        for (const books of results) {
          for (const book of books) {
            if (!cartBookIds.has(book.id) && !seen.has(book.id)) {
              seen.add(book.id);
              merged.push(book);
            }
          }
        }

        if (!cancelled) {
          setRecommendedBooks(merged.slice(0, MAX_RECOMMENDATIONS));
        }
      } catch {
        // Recommendations are best-effort; leave empty on failure.
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchRecommendations();

    return () => {
      cancelled = true;
    };
  }, [cart]);

  if (cart.length === 0) {
    return null;
  }

  if (recommendedBooks.length === 0 && !isLoading) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="text-primary">★</span>
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading && recommendedBooks.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
            Loading recommendations...
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="w-80 flex-shrink-0">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecommendedBooks;
