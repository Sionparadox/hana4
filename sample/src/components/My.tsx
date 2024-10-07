import Login from './Login.tsx';
import Profile from './Profile.tsx';
import Button from './atoms/Button.tsx';
import { useEffect, useRef } from 'react';
import { useSession } from '../hooks/session-context.tsx';
import { useTimeout } from '../hooks/timer-hooks.ts';
import clsx from 'clsx';

export default function My() {
  const { session, toggleReloadSession } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  let xxx = 0;
  // useEffect(() => {
  //   console.log('*******22');
  //   // alert('login plz...');

  //   return () => console.log('unmount22!!');
  // }, []);
  useTimeout(() => {
    xxx++;
  }, 1000);

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;
    // (async function () {
    //   try {
    //     const data = await fetch('/data/sample.json', { signal }).then((res) =>
    //       res.json()
    //     );
    //     console.log('My.data>>', data);
    //   } catch (error) {
    //     console.error('Error>>', error);
    //   }
    // })();
    // fetch('/data/sample.json', { signal })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data>>', data);
    //   })
    //   .catch((error) => console.error('Error>>', error));
    // return () => abortController.abort('Clean-up in My!');
  }, []);

  return (
    <>
      <div
        className={clsx(
          !session.loginUser && 'border-2 border-red-500',
          'rounded-md'
        )}
      >
        {session.loginUser ? (
          <div className='flex gap-5'>
            <Profile ref={logoutButtonRef} xxx={xxx} />
            <Button
              onClick={() => logoutButtonRef.current?.focus()}
              classNames='h-full'
            >
              MySignOut
            </Button>
          </div>
        ) : (
          <Login />
        )}
      </div>

      <Button onClick={toggleReloadSession}>Reload Session</Button>
    </>
  );
}
