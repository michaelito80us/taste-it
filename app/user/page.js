'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import auth from '../../lib/auth';
import { UserContext } from './../context/userContext';
import Spinner from './../components/Spinner';

const page = () => {
  const { setAuthenticatedUser } = useContext(UserContext);
  const router = useRouter();
  let data = false;

  useEffect(() => {
    async function check() {
      data = await auth();

      if (!data.error) {
        setAuthenticatedUser(data.user);
        router.push(`/user/${data.user.slug}`);
      } else {
        router.push('/auth/login');
      }
    }
    check();
  }, []);

  return <>{!data && <Spinner img='true' />}</>;
};

export default page;
