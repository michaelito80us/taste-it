'use client';

import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import login from '../../../lib/login';
import { useRouter, useSearchParams } from 'next/navigation';
import Login from '../components/Login';
import Register from '../components/Register';
import Image from 'next/image';

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

  useEffect(() => {
    if (!authenticatedUser.id && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setAuthenticatedUser(user);
      if (!!redirectSlug) router.push(`/event/${redirectSlug}`);
      else router.push(`/user/${user.slug}`);
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    let data;
    if (showRegister) {
      setShowSpinner(true);
      data = await login(email.current, password.current, name.current);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.removeItem('history');
    } else {
      setShowSpinner(true);
      data = await login(email.current, password.current);
      localStorage.setItem('user', JSON.stringify(data.user));
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
    <div className='fixed flex flex-col items-center w-screen h-screen pb-24 bg-pri/60 text-tst-bg max-w-[500px] left-0 right-0 mx-auto'>
      <img
        className='my-16 w-52'
        src='/images/logo.png'
        alt='logo'
      />
      <div className='fixed bottom-0 pb-[10vh]'>
        <div className='text-lg mb-[10vh]'>
          Welcome to taste.it.
          <br />
          manage all your events in one place.
        </div>
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
