type Params = {
  params: {
    time: string;
  };
};
export default function Hi({ params: { time } }: Params) {
  return <>Hi!</>;
}
