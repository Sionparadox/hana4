import { getBook, save } from '@/actions/books';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EditBook({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  const { title, writer } = getBook(+bookId);

  async function saveBook(formData: FormData) {
    'use server';
    const title = formData.get('title');
    const writer = formData.get('writer');
    console.log('save.formData>>', title, writer);
    if (!title || !writer) return alert('Input title & writer, plz');
    save(+bookId, String(title), String(writer));
    redirect(`/books/${bookId}`);
  }

  return (
    <form action={saveBook} className='space-y-3'>
      <div>
        <Label>Title</Label>
        <Input type='text' name='title' defaultValue={title} />
      </div>
      <div>
        <Label>Writer</Label>
        <Input type='text' name='writer' defaultValue={writer} />
      </div>

      <Button type='submit'>Save</Button>
    </form>
  );
}
