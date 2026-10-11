import { Book } from "@/lib/types";
import BookCard from "./book-card";

interface BookGridSectionProps {
  title: string;
  books: Book[];
}

export const BookGridSection = ({ title, books }: BookGridSectionProps) => {
  if (books.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-base font-semibold text-foreground mb-4 tracking-wide">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookGridSection;
