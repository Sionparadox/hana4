import { useState } from 'react';

import './App.css';
import Hello from './components/Hello';
import My from './components/My';

export type LoginUser = typeof SampleSession.loginUser;
export type CartItem = typeof SampleSession.cart;
export type Session = { loginUser: LoginUser | null; cart: CartItem | [] };
const SampleSession = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount(count + 1);
  const minusCount = () => setCount(count - 1);

  const [session, setSession] = useState<Session>(SampleSession);

  const logout = () => setSession({ ...session, loginUser: null });
  const login = (user: LoginUser) =>
    setSession({ ...session, loginUser: user });
  return (
    <>
      <div>
        <Hello
          name='박시온'
          age={26}
          cnt={count}
          plusCount={plusCount}
          minusCount={minusCount}
        />
      </div>
      <hr />
      <My session={session} logout={logout} login={login} />
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
