'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import auth from '../lib/auth';
import { UserContext } from './context/userContext';
import Spinner from './components/Spinner';

export default function UserPage() {
  const { setAuthenticatedUser } = useContext(UserContext);
  const router = useRouter();
  let data = false;

  useEffect(() => {
    async function check() {
      data = await auth();

      console.log('data', data);

      if (data.user) {
        setAuthenticatedUser(data.user);
        router.push(`/user/${data.user.slug}`);
      } else {
        router.push('/auth/login');
      }
    }
    check();
  }, []);

  return <>{!data && <Spinner img='true' />}</>;
}
