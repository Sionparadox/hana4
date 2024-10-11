import { getBook } from '@/actions/books';
import { notFound } from 'next/navigation';

type Params = {
  params: { bookId: string };
};

export function GET(req: Request, { params: { bookId } }: Params) {
  const book = getBook(+bookId);
  if (!book) return notFound();

  return Response.json(book);
}
