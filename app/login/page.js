'use client';
import { useRouter } from 'next/navigation';

export default function login() {
  const router = useRouter();

  router.push('/');

  return <></>;
}
