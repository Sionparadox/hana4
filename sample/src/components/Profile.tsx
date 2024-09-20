import { LoginUser } from '../App.tsx';

type Props = {
  loginUser: LoginUser;
  logout: () => void;
};
export default function Profile({ loginUser, logout }: Props) {
  return (
    <>
      <h3>{loginUser.name} Logined</h3>
      <button onClick={logout}>SignOut</button>
    </>
  );
}
