import Profile from './Profile.tsx';
import Button from './atoms/Button.tsx';
import { useRef } from 'react';
import { useSession } from '../hooks/session-context.tsx';
import Login from './Login.tsx';
import Item from './item.tsx';
import useToggle from '../hooks/toggle.ts';

export default function My() {
  const { session } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const [isAdding, toggleAdding] = useToggle();

  return (
    <>
      {session.loginUser ? (
        <div className='flex gap-5'>
          <Profile ref={logoutButtonRef} />
          <Button onClick={() => logoutButtonRef.current?.focus()}>
            MySignOut
          </Button>
        </div>
      ) : (
        <Login />
      )}

      <ul className='my-3 w-2/3 border p-3'>
        {session.cart?.length ? (
          session.cart.map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))
        ) : (
          <li className='text-slate-500'>There is no items.</li>
        )}
        <li className='mt-3 text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: '', price: 0 }}
              toggleAdding={toggleAdding}
            ></Item>
          ) : (
            <Button onClick={toggleAdding}>+ Add Item</Button>
          )}
        </li>
      </ul>
    </>
  );
}
