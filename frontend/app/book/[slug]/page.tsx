import { notFound } from "next/navigation";
import { BookHero } from "@/components/book-hero";
import { getBookBySlug } from "@/lib/api/books";
import RelatedReads from "@/app/book/[slug]/related-reads";
import WriterProfile from "./writer-profile";
import BookSpecsAccordion from "./book-specs-accordion";
import RequireAuth from "@/components/require-auth";

interface BookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <BookHero book={book} />

            <WriterProfile book={book} />

            <BookSpecsAccordion book={book} />
          </div>

          <RelatedReads />
        </main>
      </div>
    </RequireAuth>
  );
}
