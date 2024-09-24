import { FaPlus, FaTrashCan } from 'react-icons/fa6';
import { Session } from '../App.tsx';
import Login, { LoginHandler } from './Login.tsx';
import Profile from './Profile.tsx';
import Button from './atoms/Button.tsx';
import { FormEvent, ForwardedRef, forwardRef, useRef, useState } from 'react';
import { FaRedo, FaSave } from 'react-icons/fa';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (name: string, price: number) => void;
};

export default forwardRef(function My(
  { session, logout, login, removeCartItem, addCartItem }: Props,
  ref: ForwardedRef<LoginHandler>
) {
  const [isEditing, setIsEditing] = useState(false);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const toggleEditing = () => setIsEditing((pre) => !pre);

  const removeItem = (id: number) => {
    if (confirm('Are u sure?')) {
      removeCartItem(id);
    }
  };

  const saveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    if (!name) {
      alert('이름을 입력하세요!');
      return nameRef.current?.focus();
    } else if (!price) {
      alert('가격을 입력하세요!');
      return priceRef.current?.focus();
    }
    addCartItem(name, +price);
    nameRef.current.value = '';
    priceRef.current.value = '';
    nameRef.current.focus();
  };

  return (
    <>
      {session.loginUser ? (
        <>
          <Profile session={session} logout={logout} ref={logoutButtonRef} />
          <Button onClick={() => logoutButtonRef.current?.focus()}>
            MySignOut{' '}
          </Button>
        </>
      ) : (
        <Login login={login} ref={ref} />
      )}

      <ul className='my-3 w-1/2 border p-3'>
        {session.cart?.length ? (
          session.cart.map(({ id, name, price }) => (
            <li key={id} className='flex justify-between'>
              <strong>
                {id}. {name}
                <small className='font-light text-gray-500'>
                  {price.toLocaleString()}원
                </small>
              </strong>
              <button
                onClick={() => removeItem(id)}
                className='btn btn-danger px-1 py-0'
              >
                <FaTrashCan />
              </button>
            </li>
          ))
        ) : (
          <li className='text-slate-500'>There is no items.</li>
        )}
        <li className='mt-3 text-center'>
          {isEditing ? (
            <form onSubmit={saveItem} className='mt-3 flex gap-3'>
              <input
                ref={nameRef}
                type='text'
                placeholder='name..'
                className='inp'
              ></input>
              <input
                ref={priceRef}
                type='number'
                placeholder='price..'
                className='inp'
              ></input>
              <Button type='reset' onClick={toggleEditing}>
                <FaRedo />
              </Button>
              <Button type='submit' variant='btn-primary'>
                <FaSave />
              </Button>
            </form>
          ) : (
            <Button onClick={toggleEditing}>
              <FaPlus />
            </Button>
          )}
        </li>
      </ul>
    </>
  );
});
