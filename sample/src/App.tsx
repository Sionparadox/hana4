import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { useDebounce } from './hooks/timer-hooks';
import useToggle from './hooks/toggle';

function App() {
  const [friend, setFriend] = useState(10);
  const [, toggleRerender] = useToggle();
  const myHandleRef = useRef<MyHandler>(null);
  const friendRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      setFriend(+(friendRef.current?.value || 0));
    },
    1000,
    [friendRef.current?.value]
  );

  return (
    <div className='flex flex-col items-center'>
      <SessionProvider>
        <Hello friend={friend} ref={myHandleRef} />
        <div className='w-2/3'>
          <input
            type='number'
            defaultValue={friend}
            onChange={toggleRerender}
            ref={friendRef}
            placeholder='friend'
            className='inp'
          ></input>
        </div>
        <hr />
        <My />
      </SessionProvider>
    </div>
  );
}

export default App;
