import { memo, useReducer, useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { useDebounce } from './hooks/timer-hooks';
import useToggle from './hooks/toggle';
import Button from './components/atoms/Button';
// import { useInterval } from './hooks/timer-hooks';
// import Button from './components/atoms/Button';
// import { useCounter } from './hooks/counter-hook';

const ColorTitle = ({
  color,
  backgroundColor,
}: {
  color: string;
  backgroundColor: string;
}) => {
  console.log('@@@ ColorTitle!!', color);
  return (
    <h2 className='text-2xl' style={{ color, backgroundColor }}>
      MEMO
    </h2>
  );
};

const MemoedColorTitle = memo(ColorTitle, ({ color: a }, { color: b }) => {
  console.log('🚀  a b:', a, b);

  return a === b;
});

function App() {
  const [friend, setFriend] = useState(10);
  const [, toggleReRender] = useToggle();
  const myHandleRef = useRef<MyHandler>(null);

  const [color, changeColor] = useReducer(() => 'blue', 'red');

  const friendRef = useRef<HTMLInputElement>(null);
  useDebounce(
    () => {
      // console.log('useDebounce>>>>>>>', friendRef.current?.value);
      setFriend(+(friendRef.current?.value || 0));
    },
    1000,
    [friendRef.current?.value]
  );

  // const { reset, clear } = useInterval(() => depArr((pre) => pre + 1), 1000);

  return (
    <div className='flex flex-col items-center'>
      {/* <h1 className='text-2xl'>F: {friend}</h1>
      <div className='flex'>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={clear}>Clear</Button>
      </div> */}

      <div className='flex gap-2'>
        <MemoedColorTitle color='white' backgroundColor={color} />
        <Button onClick={changeColor}>ChangeColor</Button>
      </div>

      <SessionProvider>
        <div className='mt-3 w-64'>
          <input
            type='number'
            defaultValue={friend}
            // onChange={(e) => setFriend(+e.currentTarget.value)}
            onChange={toggleReRender}
            ref={friendRef}
            placeholder='friend id...'
            className='inp'
          />
        </div>
        <Hello friend={friend} ref={myHandleRef} />
        <hr />
        <My />
      </SessionProvider>

      {/* <div className='card'>
        <button
          onClick={() => {
            plusCount();
            if (session.loginUser) session.loginUser.name = 'XXX' + count;
            // console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
          }}
          className='btn'
        >
          App.count is {count}
        </button>
      </div> */}
    </div>
  );
}

export default App;
