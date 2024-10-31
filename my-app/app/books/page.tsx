'use client';

import { useFetch } from '@/hooks/fetch-hook';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Book } from '../api/books/bookdata';

export default function Books() {
  const [searchStr, setSearchStr] = useState('');
  const { data: session } = useSession();
  const { data: books } = useFetch<Book[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/books?q=222`
  );

  return (
    <>
      <h1 className='text-2xl'>{session?.user?.name} Books</h1>

      <Input
        onChange={(e) => setSearchStr(e.currentTarget.value)}
        placeholder='title or writer...'
      />
      {books?.length ? (
        <ul className='x'>
          {books
            .filter(
              ({ title, writer }) =>
                title.includes(searchStr) || writer.includes(searchStr)
            )
            .map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>{title}</Link>
              </li>
            ))}
        </ul>
      ) : (
        <div>There is no books.</div>
      )}
    </>
  );
}
