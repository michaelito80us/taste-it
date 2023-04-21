'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import auth from '../lib/auth';
import { UserContext } from './context/userContext';

export default function Home() {
  const { setAuthenticatedUser } = useContext(UserContext);
  const router = useRouter();
  let data;
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

  return <></>;
}
