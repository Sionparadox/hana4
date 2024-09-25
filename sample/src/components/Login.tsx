import { FormEvent, useEffect, useImperativeHandle, useRef } from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-hook';

export type LoginHandler = {
  focus: (prop: string) => void;
};

export default function Login() {
  const { login, loginRef } = useSession();
  const { plusCount, minusCount } = useCounter();
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handler: LoginHandler = {
    focus(prop) {
      if (prop === 'id') idRef.current?.focus();
      if (prop === 'name') nameRef.current?.focus();
    },
  };

  useImperativeHandle(loginRef, () => handler);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = idRef.current?.value ?? 0;
    const name = nameRef.current?.value ?? '';
    login(+id, name);
  };

  useEffect(() => {
    plusCount();

    return minusCount;
  });

  return (
    <>
      <form onSubmit={signIn} className='border p-4'>
        <LabelInput label='ID' type='number' ref={idRef} />
        <div className='flex'>
          <label htmlFor='name' className='w-24'>
            Name:
          </label>
          <input
            id='name'
            type='text'
            ref={nameRef}
            placeholder='Name...'
            className='inp'
          />
        </div>

        <Button type='submit' variant='btn-success' classNames='float-end mt-3'>
          Sign In
        </Button>
      </form>
    </>
  );
}
