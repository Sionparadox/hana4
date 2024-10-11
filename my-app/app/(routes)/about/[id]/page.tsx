import { notFound } from 'next/navigation';
import { getTodos } from '@/lib/todos';

export const revalidate = 5;
// export const dynamic = 'auto';
// export const dynamic = 'error';
// export const dynamic = 'force-static';
// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return (await getTodos(1)).map(({ id }) => ({
    id: id.toString(),
  }));
  // return [{ id: '1' }, { id: '2' }];
}

export default async function AboutTodo({
  params: { id },
}: {
  params: { id: string };
}) {
  // console.log('🚀 About - todo - id:', id);
  const todos = await getTodos(1);
  const todo = todos.find((td) => td.id === +id);
  if (!todo) {
    // return <h1 className='text-2xl text-red-500'>#{id} is not found!!</h1>;
    // throw new Error('xxxxxxxx');
    return notFound();
  }

  const { title, completed } = todo;

  return (
    <>
      <h1 className='text-2xl'>About Todo #{id}</h1>
      <strong className={`${completed ? 'line-through' : 'font-extrabold'}`}>
        {title}
      </strong>
    </>
  );
}
