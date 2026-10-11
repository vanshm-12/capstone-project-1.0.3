"use client";

import { CategorySidebar } from "@/components/category-sidebar";
import FilterBar, {
  FORMAT_TYPE,
  BookFilter,
  LANGUAGE_TYPE,
  PRICE_TYPE,
  SORT_TYPE,
} from "@/components/filter-bar";

import { useBooksQuery } from "@/lib/api/books";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import BookGridSection from "@/components/book-grid-section";

export default function HomePage() {
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

  const {
    data: books = [],
    isLoading,
    error,
  } = useBooksQuery(methods.getValues());

  return (
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
            )}{" "}
            {error && (
              <div className="flex items-center justify-center py-20 text-destructive text-sm">
                Unable to load books from backend service.
              </div>
            )}
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
                  books={books.slice(0, 8)}
                />
                <BookGridSection
                  title="Explore All Books"
                  books={books.slice(8)}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
