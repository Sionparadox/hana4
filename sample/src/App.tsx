import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { type LoginHandler } from './components/Login';
import { useCounter } from './hooks/counter-hook';

const SampleSession = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type LoginUser = typeof SampleSession.loginUser;
type CartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: CartItem[] };

function App() {
  const { count, plusCount } = useCounter();
  const [session, setSession] = useState<Session>(SampleSession);

  const myHandleRef = useRef<MyHandler>(null);

  const logout = () => setSession({ ...session, loginUser: null });

  const loginRef = useRef<LoginHandler>(null);

  const login = (id: number, name: string) => {
    if (!id) {
      alert('ID를 입력하세요!');
      return loginRef.current?.focus('id');
    }
    if (!name) {
      alert('이름를 입력하세요!');
      return loginRef.current?.focus('name');
    }
    setSession({
      ...session,
      loginUser: { id, name },
    });
  };

  // console.log('Apppppp');

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    setSession({ ...session, cart: [...session.cart, { id, name, price }] });
  };

  const removeCartItem = (toRemoveId: number) => {
    // patten 1)
    // session.cart = session.cart.filter(({ id }) => id !== toRemoveId);
    // setSession({ ...session });

    // patten 2)
    setSession({
      ...session,
      cart: session.cart.filter(({ id }) => id !== toRemoveId),
    });
  };

  return (
    <div className='mt-5 flex flex-col items-center'>
      <Hello name='홍길동' age={33} ref={myHandleRef} />
      <hr />
      <My
        session={session}
        logout={logout}
        login={login}
        removeCartItem={removeCartItem}
        addCartItem={addCartItem}
        ref={loginRef}
      />
      <div className='card'>
        <button
          onClick={() => {
            plusCount();
            if (session.loginUser) session.loginUser.name = 'XXX' + count;
            console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
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
