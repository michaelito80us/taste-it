'use client';

import { useRef, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import login from '../../../lib/login';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const email = useRef('');
  const password = useRef('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectSlug = searchParams.get('redirectBack');

  async function onSubmit(e) {
    e.preventDefault();

    const data = await login(email.current, password.current);

    console.log('FROM LOGIN');

    console.log(data);

    if (data.error) {
      // TODO: handle error
      console.log(data.error);
      console.log('error', data.error.message);
    } else {
      // need to set the context value to be the user
      setAuthenticatedUser(data.user);
      if (redirectSlug) router.push(`/event/${redirectSlug}`);
      else router.push(`/user/${data.user.slug}`);
    }
  }

  return (
    <div className='flex flex-col items-center h-screen justify-evenly bg-gradient-to-br from-cyan-300 to-sky-600'>
      <div>
        Welcome to taste it.
        <br />
        Please login to continue.
      </div>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-2 py-4 bg-white rounded-md shadow px-7'>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => (email.current = e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => (password.current = e.target.value)}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
