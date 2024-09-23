import { Session } from '../App';
import Button from './atoms/Button';

type Props = {
  session: Session;
  logout: () => void;
};

export default function Profile({ session, logout }: Props) {
  return (
    <div>
      <h3>{session.loginUser?.name} Logined</h3>
      <button onClick={logout} className='btn btn-primary'>
        Sign Out
      </button>

      <Button onClick={logout} text='SignOut' />
    </div>
  );
}
