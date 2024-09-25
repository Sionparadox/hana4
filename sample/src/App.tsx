import { useRef } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/counter-hook';
import { SessionProvider } from './hooks/session-context';

function App() {
  const { count, plusCount } = useCounter();

  const myHandleRef = useRef<MyHandler>(null);
  // console.log('Apppppp');

  return (
    <div className='mt-5 flex flex-col items-center'>
      <Hello name='홍길동' age={33} ref={myHandleRef} />
      <hr />
      <SessionProvider>
        <My />
      </SessionProvider>
      <div className='card'>
        <button
          onClick={() => {
            plusCount();
          }}
          className='btn'
        >
          App.count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
