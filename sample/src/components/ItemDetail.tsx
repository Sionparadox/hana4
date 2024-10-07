import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { type CartItem, useSession } from '../hooks/session-context';
import clsx from 'clsx';
import Button from './atoms/Button';

export default function ItemDetail() {
  const {
    session: { cart },
  } = useSession();
  const { id: itemId } = useParams();
  const item = useOutletContext<CartItem>();

  // const item = cart.find(({ id }) => id === Number(itemId));

  const [searchParams, setSearchParams] = useSearchParams({});
  const id = searchParams.get('q');
  console.log('🚀  id:', id);

  const setQ = () => setSearchParams('q=111000');

  return (
    <>
      Item Detail: {itemId} :: {item?.name}
      <ul>
        {cart.map(({ id, name }) => (
          <li key={id} className={clsx(id === Number(itemId) && 'active')}>
            {name}
          </li>
        ))}
      </ul>
      <Button onClick={setQ}>QQQ</Button>
    </>
  );
}
