import { useRef } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
// import { useCounter } from './hooks/counter-hook';

function App() {
  const myHandleRef = useRef<MyHandler>(null);
  return (
    <div className='flex flex-col items-center'>
      <SessionProvider>
        <Hello age={33} ref={myHandleRef} />
        <hr />
        <My />
      </SessionProvider>
    </div>
  );
}

export default App;
