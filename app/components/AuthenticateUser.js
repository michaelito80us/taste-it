'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import auth from '../../lib/auth';
import { UserContext } from './../context/userContext';
import Spinner from './Spinner';

const AuthenticateUser = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const router = useRouter();
  let data = false;

  useEffect(() => {
    console.log('authenticatedUser', authenticatedUser);
    if (!authenticatedUser.id) {
      async function check() {
        data = await auth();

        if (!!data.user) {
          setAuthenticatedUser(data.user);
          router.push(`/user/${data.user.slug}`);
        } else {
          router.push('/auth/login');
        }
      }
      check();
    } else {
      router.push(`/user/${authenticatedUser.slug}`);
    }
  }, []);

  return <>{!data && <Spinner img='true' />}</>;
};

export default AuthenticateUser;
