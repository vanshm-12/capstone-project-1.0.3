import { notFound, redirect } from "next/navigation";
import { getBookById } from "@/lib/api/books";

interface BookByIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookByIdPage({ params }: BookByIdPageProps) {
  const { id } = await params;
  const book = await getBookById(Number(id));

  if (!book) {
    notFound();
  }

  redirect(`/book/${book.slug}`);
}
