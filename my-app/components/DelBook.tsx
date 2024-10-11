'use client';

import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  // remove: () => void;
  id: number;
};

export default function DelBook({ id }: Props) {
  const remove = async () => {
    if (!confirm('Are u sure??')) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    console.log('🚀  res:', res);
  };

  return (
    <Button onClick={remove} variant={'destructive'}>
      <Trash2Icon />
      Del
    </Button>
  );
}
