import { ChangeEvent, FormEvent, useState } from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';

export default function Login({
  login,
}: {
  login: (id: number, name: string) => void;
}) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !name) {
      alert('Input the id & name!!');
      return;
    }
    login(id, name);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  return (
    <>
      <form onSubmit={signIn} className='border p-4'>
        <LabelInput
          label='ID'
          type='number'
          onChange={(e) => setId(+e.currentTarget.value)}
        />
        <LabelInput label='Name' type='text' onChange={changeName} />
        <Button
          text='Sign In'
          variant='btn-success'
          classNames='float-end mt-3'
        />
      </form>
    </>
  );
}
