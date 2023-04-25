'use client';

import { useRef, useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import login from '../../../lib/login';
import { useRouter, useSearchParams } from 'next/navigation';
import Login from '../components/Login';
import Register from '../components/Register';

const LoginPage = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const email = useRef('');
  const password = useRef('');
  const name = useRef('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectSlug = searchParams.get('redirectBack');

  async function onSubmit(e) {
    e.preventDefault();

    let data;
    if (showRegister) {
      setShowSpinner(true);
      data = await login(email.current, password.current, name.current);
      localStorage.removeItem('history');
    } else {
      setShowSpinner(true);
      data = await login(email.current, password.current);
    }

    console.log('FROM LOGIN');

    console.log(data);

    if (data.error) {
      // TODO: handle error
      console.log(data.error);
      console.log('error', data.error.message);
    } else {
      // need to set the context value to be the user

      setAuthenticatedUser(data.user);
      console.log('redirectSlug', redirectSlug);
      if (!!redirectSlug) router.push(`/event/${redirectSlug}`);
      else router.push(`/user/${data.user.slug}`);
    }
  }

  return (
    <div className='flex flex-col items-center h-screen pb-24 bg-pri/60 text-tst-bg'>
      <img
        className='pt-10 my-32 w-52'
        src='/images/logo.png'
        alt='logo'
      />
      <div className='mb-32 text-lg'>
        Welcome to taste.it.
        <br />
        manage all your events in one place.
      </div>
      <div className='fixed bottom-24'>
        {showRegister ? (
          <>
            <Register
              onSubmit={onSubmit}
              email={email}
              password={password}
              name={name}
              setShowRegister={setShowRegister}
            />
          </>
        ) : (
          <>
            <Login
              onSubmit={onSubmit}
              email={email}
              password={password}
              setShowRegister={setShowRegister}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
