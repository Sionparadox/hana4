'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';

export default function Me() {
  console.log('Mememememe!!!!!');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goBack = () => {
    router.back();
  };

  const goHello = () => router.push('/hello', { scroll: false });

  const changeSearchParams = (x: string) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set('xxx', x);
    console.log('🚀  urlSearchParams:', urlSearchParams.toString());
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <Modal>
      <div className={cn('p-3 justify-between text-sm flex')}>
        <button onClick={goBack}>Back</button>
        <button onClick={goHello}>Hello</button>
        <button onClick={() => changeSearchParams('999')}>change xxx</button>
      </div>
      Me Page: {pathname}?xxx={searchParams.get('xxx')}
    </Modal>
  );
}
