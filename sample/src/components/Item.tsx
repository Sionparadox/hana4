import { FormEvent, MouseEvent, useRef, useState } from 'react';
import { CartItem, useSession } from '../hooks/session-context';
import Button from './atoms/Button';
import { FaRedo, FaSave } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  item: CartItem;
  toggleAdding?: () => void;
};
export default function Item({ item, toggleAdding }: Props) {
  const { id, name, price } = item;
  const { addCartItem, removeCartItem, editCartItem } = useSession();

  const [isEditing, setIsEditing] = useState(!id);
  const [hasDirty, setDirty] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const toggleEditing = () => {
    if (hasDirty && nameRef.current && priceRef.current) {
      nameRef.current.value = name;
      priceRef.current.value = String(price);
      checkDirty();
    }

    if (toggleAdding) toggleAdding();
    else setIsEditing((pre) => !pre);
  };

  const removeItem = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    if (confirm('Are u sure?')) {
      removeCartItem(id);
    }
  };

  const saveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    if (!name) {
      alert('상품명을 입력하세요!');
      return nameRef.current?.focus();
    } else if (!price) {
      alert('금액을 입력하세요!');
      return priceRef.current?.focus();
    }
    if (id === 0) addCartItem(name, +price);
    else editCartItem({ id, name, price: +price });

    nameRef.current.value = '';
    priceRef.current.value = '';
    nameRef.current.focus();

    toggleEditing();
  };

  const checkDirty = () => {
    const currName = nameRef.current?.value;
    const currPrice = Number(priceRef.current?.value);
    setDirty(name != currName || price !== currPrice);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={saveItem} className='mt-3 flex gap-3'>
          <input
            ref={nameRef}
            type='text'
            onChange={checkDirty}
            defaultValue={name}
            placeholder='name..'
            className='inp'
          />
          <input
            ref={priceRef}
            type='number'
            onChange={checkDirty}
            placeholder='price..'
            defaultValue={price}
            className='inp'
          />
          <Button type='reset' onClick={toggleEditing}>
            <FaRedo />
          </Button>
          {hasDirty ? (
            <div className='w-20'>
              <Button type='submit' variant='btn-primary' className='m-0 p-0'>
                <FaSave />
              </Button>
            </div>
          ) : (
            <div className='w-20'></div>
          )}
        </form>
      ) : (
        <a
          href='#'
          onClick={toggleEditing}
          className='group flex justify-between hover:bg-gray-200'
        >
          <strong className='group-hover:text-blue-500'>
            {name}
            <small className='ml-2 font-light text-gray-500 group-hover:text-gray-100'>
              {price.toLocaleString()}원
            </small>
          </strong>
          <button
            onClick={(e) => removeItem(e, id)}
            className='btn btn-danger px-1 py-0'
          >
            <FaTrashCan />
          </button>
        </a>
      )}
    </>
  );
}
