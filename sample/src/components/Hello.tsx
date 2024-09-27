import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-hook';
import { useSession } from '../hooks/session-context';
import { useFetch } from '../hooks/fetch-hooks';
import { FaSpinner } from 'react-icons/fa';

type TitleProps = {
  text: string;
  name?: string;
};

const Title = ({ text, name }: TitleProps) => {
  return (
    <h1 className='text-3xl'>
      {text} {name}
    </h1>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  return (
    <div className='red' style={{ color: 'blue' }}>
      {children}
    </div>
  );
};

type Props = {
  friend: number;
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

function Hello({ friend }: Props, ref: ForwardedRef<MyHandler>) {
  const {
    session: { loginUser },
  } = useSession();
  const { count, plusCount, minusCount } = useCounter();
  const [myState, setMyState] = useState(0);

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
    false,
    [friend]
  );

  return (
    <div className='my-5 w-2/3 border border-slate-300 p-3 text-center'>
      <Title text='Hello~' name={loginUser?.name} />
      <Body>
        <h3 className='text-center text-2xl'>myState: {myState}</h3>
        {isLoading && (
          <span className='flex justify-center'>
            <FaSpinner className='animate-spin text-slate-500' />
          </span>
        )}
        {error ? (
          <strong className='text-red-500'>
            {error.message && error.message.startsWith('404')
              ? `Your friend is not found(${friend})`
              : error.message}
          </strong>
        ) : (
          <>My Friend is {friendInfo?.username}</>
        )}
      </Body>
      <button
        onClick={() => {
          setMyState(myState + 1);
          plusCount();
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
    </div>
  );
}

const ImpHello = forwardRef(Hello);

export default ImpHello;
