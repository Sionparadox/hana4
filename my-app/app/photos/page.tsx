import Image from 'next/image';
import { getPhotos } from '@/lib/photos';

export default async function Photos() {
  const photos = await getPhotos();

  return (
    <>
      <h1 className='text-2xl'>Photos</h1>
      <div className='flex'>
        {photos.map(({ id, title, thumbnailUrl }) => (
          <Image
            key={id}
            src={thumbnailUrl}
            alt={title}
            width={150}
            height={150}
          />
        ))}
      </div>
    </>
  );
}
