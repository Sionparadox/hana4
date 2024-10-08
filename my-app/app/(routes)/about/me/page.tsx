'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Me() {
  const v = 0;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());
  const goBack = () => router.back();
  const goHello = () => router.push('/hello', { scroll: false });
  const changeSearchParams = (x: string) => {
    urlSearchParams.set('xxx', x);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };
  return (
    <>
      <div className='flex justify-between'>
        <button onClick={goBack}>Back</button>
        <button onClick={goHello}>Hello</button>
        <button onClick={() => changeSearchParams('999')}>change-xxx</button>
      </div>
      Me Page : {pathname}?xxx={searchParams.get('xxx')}
    </>
  );
}
