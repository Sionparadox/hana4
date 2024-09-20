import { LoginUser, Session } from '../App.tsx';
import Login from './login.tsx';
import Profile from './Profile.tsx';

type Props = {
  session: Session;
  logout: () => void;
  login: (user: LoginUser) => void;
};
export default function My({ session, logout, login }: Props) {
  return (
    <>
      <div>
        {session.loginUser ? (
          <Profile loginUser={session.loginUser} logout={logout} />
        ) : (
          <Login login={login} />
        )}
      </div>
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            {name} <small>({price.toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </>
  );
}
