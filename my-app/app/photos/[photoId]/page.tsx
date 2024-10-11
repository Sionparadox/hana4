'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { getPhoto, type Photo } from '@/lib/photos';

export default function Photo({
  params: { photoId },
}: {
  params: {
    photoId: string;
  };
}) {
  const [photo, setPhoto] = useState<Photo>();
  useLayoutEffect(() => {
    (async function () {
      const data = await getPhoto(+photoId);
      setPhoto(data);
    })();
  }, [photoId]);

  const router = useRouter();
  const goList = () => {
    router.push('/photos');
  };
  return (
    <>
      <h1 className='text-2xl mt-5'>
        #{photo?.albumId} - {photo?.title}
      </h1>
      {photo && (
        <Image
          onClick={goList}
          src={photo.url}
          alt={photo.title}
          width={600}
          height={600}
          loading='lazy'
          className='cursor-pointer'
        />
      )}
      <h2 className='text-xl'>{photo?.title}</h2>
    </>
  );
}
