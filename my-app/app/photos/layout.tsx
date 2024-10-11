import { ReactNode } from 'react';

export default function PhotosLayout({
  children,
  viewer,
}: {
  children: ReactNode;
  viewer: ReactNode;
}) {
  return (
    <>
      <div className='bg-cyan-200 w-full'>Photos Header...</div>
      {children}
      <div className=''>{viewer}</div>
    </>
  );
}
