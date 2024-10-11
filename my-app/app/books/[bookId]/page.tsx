import { getBook } from '@/actions/books';
import { type Book } from '@/app/api/books/bookdata';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DelBook from '@/components/DelBook';
import { Button } from '@/components/ui/button';

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

  // const remove = () => {
  //   if (confirm('Are u sure?')) {
  //     console.log('******');
  //   }
  // };

  return (
    <div className='mx-3 space-y-3'>
      <div className='flex justify-between border-b border-slate-300'>
        bookId: <strong>{bookId}</strong>
      </div>
      <div className='flex justify-between border-b border-slate-300'>
        title: <strong>{book.title}</strong>
      </div>
      <div className='flex justify-between border-b border-slate-300'>
        writer: <strong>{book.writer}</strong>
      </div>

      <div className='text-right space-x-4'>
        <DelBook id={+bookId} />
        <Link href={`/books/${bookId}/edit`}>
          <Button variant={'outline'}>
            <PencilIcon /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
