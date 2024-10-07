import { FaPlus } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import Button from './atoms/Button';
import { useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import useToggle from '../hooks/toggle';
import { useDebounce } from '../hooks/timer-hooks';
import { useSession } from '../hooks/session-context';
import Item from './Item';

export default function Items() {
  const { session } = useSession();
  // const [isAdding, setIsAdding] = useState(false);
  // const toggleAdding = () => {
  //   setIsAdding((pre) => !pre);
  // };
  // const [isAdding, toggleAdding] = useToggle();
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  // onChange={(e) => addPrice(+e.currentTarget.value)}
  // const [totalPrice, addPrice] = useReducer(
  //   (acc, toAddPrice) => acc + toAddPrice,
  //   0
  // );

  const [, toggleSearch] = useToggle();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchstr, setSearchstr] = useState('');

  useDebounce(
    () => {
      // console.log('useDebounce.search>>', searchRef.current?.value);
      setSearchstr(searchRef.current?.value || '');
    },
    200,
    [searchRef.current?.value]
  );

  const [ulHeight, setUlHeight] = useState(0);

  // const ulCbRef = useCallback(
  //   (node: HTMLUListElement) => {
  //     console.log('node>>>', node, session.cart.length);
  //     setUlHeight(node?.clientHeight);
  //   },
  //   [session.cart.length]
  // );
  const ulCbRef = (node: HTMLUListElement) => {
    // console.log('node>>>', node, session.cart.length);
    setUlHeight(node?.clientHeight);
  };

  // const primitive = 123;

  // useEffect(() => {
  //   console.log('*******11', primitive, isAdding);

  //   return () => console.log('unmount11!!');
  // }, [primitive, isAdding]);

  const totalPrice = useMemo(
    () => session.cart?.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const dcPrice = useMemo(() => totalPrice * 0.1, [totalPrice]);

  useLayoutEffect(() => {
    // console.log('$$$$$$$$$$$$$$$$', totalPrice);
  }, [totalPrice]);

  return (
    <>
      <div className='w-full border p-3'>
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
        <ul ref={ulCbRef} className='mt-3 px-3'>
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
              <Button onClick={toggleAdding}>
                <FaPlus /> Add Item
              </Button>
            )}
          </li>
        </ul>
      </div>

      <div className='mb-3 flex gap-5'>
        <span>*총액: {totalPrice?.toLocaleString()}원</span>
        <span>*할인: {dcPrice.toFixed(0).toLocaleString()}원</span>
        <span>{ulHeight}</span>
      </div>
    </>
  );
}
