import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useReducer,
  useState,
  useTransition,
} from 'react';
import { useCounter } from '../hooks/counter-hook';
import { useSession } from '../hooks/session-context';
import { useFetch } from '../hooks/fetch-hook';
import { FaSpinner } from 'react-icons/fa6';
import { useMyReducer, useMyState } from '../libs/my-uses';
import Button from './atoms/Button';
import useToggle from '../hooks/toggle';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TitleProps = {
  text: string;
  name?: string;
};

const Title = ({ text, name }: TitleProps) => {
  // console.log('Titttttttttttttt!!');
  return (
    <h1 className='text-3xl'>
      {text} {name}
    </h1>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  // console.log('bodddddddd!!!');
  return (
    <div className='red' style={{ color: 'blue' }}>
      {children}
    </div>
  );
};

type Props = {
  friend?: number;
};

export type MyHandler = {
  jumpHelloState: () => void;
};

type PlaceUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function Hello({ friend = 10 }: Props, ref: ForwardedRef<MyHandler>) {
  const {
    session: { loginUser },
  } = useSession();
  const { count, plusCount, minusCount } = useCounter();

  const [isPStrong, togglePStrong] = useToggle(false);
  const [p, dispatchP] = useReducer((pre) => pre + 1, 0);
  const [q, dispatchQ] = useMyReducer((pre) => pre + 1, 0);
  // const [myState, setMyState] = useState(0);
  const [myState, setMyState] = useMyState(0);
  let v = 1;

  const [arr, setArr] = useState<{ id: number }[]>([]);
  const [isPending, startTransition] = useTransition();

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  const {
    data: friendInfo,
    isLoading,
    error,
  } = useFetch<PlaceUser>(
    `https://jsonplaceholder.typicode.com/users/${friend}`,
    true,
    [friend]
  );

  return (
    <div className='bg-blackx text-whitex my-1 w-full border border-slate-300 p-3 text-center'>
      <div className='flex justify-around'>
        <Title text='Hello~' name={loginUser?.name} />
        <span className={clsx('text-4xl', isPStrong && 'text-blue-500')}>
          p: {p}
        </span>
        <span
          className={clsx({
            [twMerge(`pr-5 px-${q} pl-${q + 1} text-${q}xl`)]: true,
            'text-blue-500': !isPStrong,
          })}
        >
          q: {q}
        </span>
        <Button
          onClick={() => {
            dispatchP();
            togglePStrong(true);
          }}
        >
          PPP
        </Button>
        <Button
          onClick={() => {
            dispatchQ();
            togglePStrong(false);
          }}
        >
          QQQ
        </Button>
      </div>
      <Body>
        <h3 className='text-center text-lg'>myState: {myState}</h3>
        {isLoading ? (
          <h3 className='flex justify-center'>
            <FaSpinner size={20} className='animate-spin text-slate-500' />
          </h3>
        ) : error ? (
          <strong className='text-red-500'>
            {error.message && error.message.startsWith('404')
              ? `Your friend is not found(${friend})`
              : error.message}
          </strong>
        ) : (
          <div className='flex h-10 items-center justify-center rounded-lg shadow-[0_0_10px_purple]'>
            My friend is {friendInfo?.id}. {friendInfo?.username}.
          </div>
        )}
        <p>
          {v} - {friend}
        </p>
      </Body>
      <button
        onClick={() => {
          v++;
          setMyState(myState + 1);
          plusCount();
          // console.log('v/myState=', v, myState);
          startTransition(() => {
            const newArr = Array.from({ length: 70000 }, (_, i) => ({
              id: i + myState,
            }));
            // console.log('🚀  newArr:', newArr);
            setArr(newArr);
          });
        }}
        className='btn'
      >
        Hello(+)
      </button>
      <strong id='cnt' className='mx-5'>
        {count}
      </strong>
      <button onClick={() => minusCount()} className='btn btn-danger'>
        Minus
      </button>
      {isPending ? (
        <FaSpinner className='animate-spin' />
      ) : (
        <ul>
          {arr.map((a) => (
            <li key={a.id}>{a.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const ImpHello = forwardRef(Hello);

export default ImpHello;
