"use client";

import { useState } from "react";
import { CategorySidebar } from "@/components/category-sidebar";
import FilterBar from "@/components/filter-bar";
import {
  FORMAT_TYPE,
  BookFilter,
  LANGUAGE_TYPE,
  PRICE_TYPE,
  SORT_TYPE,
} from "@/lib/types";

import { useBooksQuery } from "@/lib/api/books";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import BookGridSection from "@/components/book-grid-section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RequireAuth from "@/components/require-auth";

export default function BooksPage() {
  const [page, setPage] = useState(0);

  const methods = useForm<BookFilter>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      category: "All",
      search_query: "",
      language: LANGUAGE_TYPE.ALL,
      format: FORMAT_TYPE.ALL,
      price_range: PRICE_TYPE.ALL,
      sort_by: SORT_TYPE.RELEVANCE,
    },
  });

  const watched = useWatch({ control: methods.control });
  const { data, isLoading, error } = useBooksQuery(watched, page);
  const books = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  if (methods.formState.isDirty && !isLoading && books.length === 0 && !error) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1 flex overflow-hidden">
            <CategorySidebar methods={methods} />
            <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4">
              <FilterBar methods={methods} />
              <div className="mt-6 flex-1 flex items-center justify-center text-muted-foreground text-sm">
                No books match your filters.
              </div>
            </div>
          </main>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex overflow-hidden">
        <CategorySidebar methods={methods} />

        <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4">
          <FilterBar methods={methods} />

          <div className="mt-6 flex-1">
            {isLoading && (
              <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                Loading bookstore catalog...
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center py-20 text-destructive text-sm">
                Unable to load books from backend service.
              </div>
            )}

            {!isLoading && !error && (
              <>
                {methods.formState.isDirty ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-foreground">
                        Showing results ({books.length})
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => methods.reset()}
                      >
                        Clear Filter
                      </Button>
                    </div>
                    <BookGridSection title="" books={books} />
                  </div>
                ) : (
                  <>
                    <BookGridSection
                      title="Popular Books"
                      books={books.slice(0, 6)}
                    />
                    <BookGridSection
                      title="Explore All Books"
                      books={books.slice(6)}
                    />
                  </>
                )}
              </>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => {
                    setPage((p) => Math.max(0, p - 1));
                  }}
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground px-2">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
    </RequireAuth>
  );
}