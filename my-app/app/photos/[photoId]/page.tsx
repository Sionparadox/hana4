export default function Photo({
  params: { photoId },
}: {
  params: {
    photoId: string;
  };
}) {
  return <>Photo Detail: {photoId}</>;
}
