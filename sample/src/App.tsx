import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
// import { useCounter } from './hooks/counter-hook';

function App() {
  const [friend, setFriend] = useState(10);
  const myHandleRef = useRef<MyHandler>(null);

  return (
    <div className='flex flex-col items-center'>
      <SessionProvider>
        <Hello friend={friend} ref={myHandleRef} />
        <div className='w-2/3'>
          <input
            type='number'
            defaultValue={friend}
            onChange={(e) => setFriend(+e.currentTarget.value)}
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
