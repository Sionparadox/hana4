import { getBook } from '@/actions/books';
import { type Book } from '@/app/api/books/bookdata';
import { notFound } from 'next/navigation';

export default async function Book({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  // const book = (await fetch(`http://localhost:3000/api/books/${bookId}`).then(
  //   (res) => res.json()
  // )) as Book; // Bad!!

  const book = getBook(+bookId); // Good
  if (!book) return notFound();

  return (
    <>
      bookId: {bookId}, {book.title}
    </>
  );
}
