const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const getPhoto = async (photoId: number) => {
  const data = await fetch(`${BASE_URL}/photos/${photoId}`, {
    // cache: 'force-cache',
    // cache: 'no-store',
    // next: { revalidate: 5 },
  }).then((res) => res.json());

  return data as Photo;
};

export const getPhotos = async (albumId: number = 1) => {
  const data = await fetch(`${BASE_URL}/albums/${albumId}/photos`, {
    cache: 'force-cache',
    // cache: 'no-store',
    // next: { revalidate: 5 },
  }).then((res) => res.json());

  // const data = await res.json();
  // return data;

  // return res.json();
  return data as Photo[];
};
