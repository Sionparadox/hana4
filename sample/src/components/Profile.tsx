import { ForwardedRef, forwardRef } from 'react';
import { Session } from '../App';
// import Button from './atoms/Button';

type Props = {
  session: Session;
  logout: () => void;
};

const Profile = forwardRef(
  ({ session, logout }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <div className='mb-3 border px-5 py-2'>
        <h3>{session.loginUser?.name} Logined</h3>
        <button
          onClick={logout}
          ref={ref}
          className='btn btn-primary normal-case'
        >
          Profile Sign Out
        </button>

        {/* <Button onClick={logout} text='SignOut' /> */}
      </div>
    );
  }
);

Profile.displayName = 'Profile';

export default Profile;
