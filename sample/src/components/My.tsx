import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { FaRegTrashCan } from 'react-icons/fa6';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (itemId: number) => void;
};

export default function My({ session, logout, login, removeCartItem }: Props) {
  const removeItem = (id: number) => {
    if (confirm('Are You Sure?')) removeCartItem(id);
  };
  return (
    <>
      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} />
      )}

      <ul className='my-3 w-1/3 border p-3'>
        {session.cart.map(({ id, name, price }) => (
          <li key={id} className='flex justify-between'>
            {name} <small>{price.toLocaleString()}원</small>
            <button
              onClick={() => removeItem(id)}
              className='btn btn-danger px-1 py-0'
            >
              <FaRegTrashCan></FaRegTrashCan>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
