import { Book, books } from '@/app/api/books/bookdata';

export const getBook = (bookId: number) =>
  books.find(({ id }) => id === +bookId) as Book;
