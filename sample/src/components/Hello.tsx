type HelloProps = {
  name: string;
  age: number;
  cnt: number;
  plusCount: () => void;
  minusCount: () => void;
};
export default function Hello({
  name,
  age,
  cnt,
  plusCount,
  minusCount,
}: HelloProps) {
  return (
    <>
      <h1>
        Hello, {name}!({cnt})
      </h1>
      <button
        onClick={() => {
          plusCount();
          console.log({ name }, { age });
        }}
      >
        PlusButton
      </button>
      <button
        onClick={() => {
          minusCount();
        }}
      >
        MinusButton
      </button>
    </>
  );
}
