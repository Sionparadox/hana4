type Params = {
  params: {
    time: string;
  };
};
export default function Time({ params: { time } }: Params) {
  return <>Good {time}!</>;
}
