'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage2() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <></>;
}
