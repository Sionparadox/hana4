'use client';

import Link from 'next/link';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { type Book } from '../api/books/bookdata';

export default function BooksLayout({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  useLayoutEffect(() => {
    (async function () {
      const data = (await fetch('http://localhost:3000/api/books').then((res) =>
        res.json()
      )) as Book[];
      console.log('data>>', data);
      setBooks(data);
    })();
  }, []);

  return (
    <>
      <h1 className='text-2xl'>My Book Case</h1>

      <div className='grid grid-cols-2 gap-3 w-full'>
        <ul className='border p-3'>
          {books.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/books/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>

        <div className='border w-full p-3'>{children}</div>
      </div>
    </>
  );
}
