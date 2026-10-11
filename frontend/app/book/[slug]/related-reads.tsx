import { getBooks } from "@/lib/api";
import { BookCard } from "../../../components/book-card";
import { Book } from "@/lib/types";

const RelatedReads = async () => {
  const books: Book[] = await getBooks().catch(() => []);

  return (
    <aside className="w-100 shrink-0 border-l px-6 py-2">
      <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
        Related Reads
      </h3>
      <div className="flex flex-col space-y-4">
        {books.slice(0, 3).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </aside>
  );
};

export default RelatedReads;
