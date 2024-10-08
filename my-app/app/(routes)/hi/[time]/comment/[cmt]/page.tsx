type Params = {
  params: {
    time: string;
    cmt: string;
  };
};

export default function Time({ params: { time, cmt } }: Params) {
  return (
    <div className='capitalize'>
      Good {time}! - Comment:
      <span className='normal-case'>{cmt}</span>
    </div>
  );
}
