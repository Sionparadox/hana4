import Login from './Login.tsx';
import Profile from './Profile.tsx';
import Button from './atoms/Button.tsx';
import { useMemo, useRef, useState } from 'react';
import { useSession } from '../hooks/session-context.tsx';
import Item from './Item.tsx';
import useToggle from '../hooks/toggle.ts';
import { useDebounce, useTimeout } from '../hooks/timer-hooks.ts';
import { FaSearch } from 'react-icons/fa';

const SALEPERCENT = 10;

export default function My() {
  const { session, toggleReloadSession } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const [isAdding, toggleAdding] = useToggle(false);

  const [, toggleSearch] = useToggle();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchstr, setSearchstr] = useState('');

  const totalPrice = useMemo(
    () =>
      session.cart
        .filter(({ name }) => name.includes(searchstr))
        .reduce((acc, item) => acc + item.price, 0),
    [session.cart, searchstr]
  );

  const dcPrice = useMemo(
    () => totalPrice * (1 - SALEPERCENT / 100),
    [totalPrice]
  );

  let xxx = 0;
  useTimeout(() => {
    xxx++;
  }, 1000);

  useDebounce(
    () => {
      setSearchstr(searchRef.current?.value || '');
    },
    1000,
    [searchRef.current?.value]
  );

  return (
    <>
      {session.loginUser ? (
        <div className='flex gap-5'>
          <Profile ref={logoutButtonRef} xxx={xxx} />
          <Button onClick={() => logoutButtonRef.current?.focus()}>
            MySignOut
          </Button>
        </div>
      ) : (
        <Login />
      )}
      <div className='w-2/3 border p-3'>
        <div className='flex items-center gap-2'>
          <FaSearch />
          <input
            // onChange={(e) => setSearchstr(e.currentTarget.value)}
            onChange={toggleSearch}
            ref={searchRef}
            type='text'
            placeholder='아이템명 검색...'
            className='inp'
          />
        </div>
        <ul className='mt-3 px-3'>
          {session.cart?.length ? (
            session.cart
              .filter(({ name }) => name.includes(searchstr))
              .map((item) => (
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
                toggleAdding={() => toggleAdding()}
              />
            ) : (
              <Button onClick={toggleAdding}>+ Add Item</Button>
            )}
          </li>
        </ul>
      </div>
      <div className='md-3 flex gap-5'>
        <span>*총액 : {totalPrice.toLocaleString()}원</span>
        <span>*할인 : {dcPrice.toFixed(0).toLocaleString()}원</span>
      </div>
      <Button onClick={toggleReloadSession}>Reload Session</Button>
    </>
  );
}
