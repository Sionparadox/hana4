import { memo, useReducer, useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { useDebounce } from './hooks/timer-hooks';
import useToggle from './hooks/toggle';
import Button from './components/atoms/Button';
import Nav from './Nav';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import { NotFound } from './NotFound';
import Home from './Home';
import Items from './components/Items';
import ItemDetail from './components/ItemDetail';
import ItemLayout from './components/ItemLayout';
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
  useLocation();
  const { pathname } = location;
  console.log(`🚀 ~ App ~ pathname:`, pathname);

  return (
    <div className='flex flex-col items-center'>
      {/* <h1 className='text-2xl'>F: {friend}</h1>
      <div className='flex'>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={clear}>Clear</Button>
      </div> */}

      <SessionProvider>
        <Nav />
        <div className='mt-9'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my' element={<My />} />
            <Route path='/items' element={<ItemLayout />}>
              <Route index element={<Items />} />
              <Route path=':id' element={<ItemDetail />} />
            </Route>

            <Route
              path='/hello'
              element={
                <Hello
                  friend={+(friendRef.current?.value || 0)}
                  ref={myHandleRef}
                />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        {pathname === '/hello' ? (
          <div className='mt-3 flex w-full items-center justify-center px-5'>
            <label htmlFor='friendid' className='w-64'>
              Hello FriendID:
            </label>
            <input
              id='friendid'
              type='number'
              defaultValue={friend}
              // onChange={(e) => setFriend(+e.currentTarget.value)}
              onChange={toggleReRender}
              ref={friendRef}
              placeholder='friend id...'
              className='inp ml-3'
            />
          </div>
        ) : (
          <></>
        )}
        {/* <Hello friend={friend} ref={myHandleRef} />
        <hr />
        <My /> */}
      </SessionProvider>

      <div className='mt-10 flex gap-2'>
        <MemoedColorTitle color='white' backgroundColor={color} />
        <Button onClick={changeColor}>ChangeColor</Button>
      </div>

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
