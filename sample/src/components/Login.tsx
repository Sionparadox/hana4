import { LoginUser } from '../App.tsx';

type Props = {
  login: (user: LoginUser) => void;
};
export default function Login({ login }: Props) {
  let new_id: number;
  let new_name: string;
  const loginNow = () => {
    if (new_id && new_name) login({ id: new_id, name: new_name });
  };
  return (
    <>
      <h3>Sign In</h3>
      <form>
        <label>LoginId</label>
        <input
          id='loginId'
          type='number'
          onChange={(e) => (new_id = Number(e.currentTarget.value))}
        ></input>
        <label>LoginName</label>
        <input
          id='loginName'
          type='text'
          onChange={(e) => (new_name = e.currentTarget.value)}
        ></input>
        <button onClick={loginNow}>SignIn</button>
      </form>
    </>
  );
}
