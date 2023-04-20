'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      className='cursor-pointer md:block w-fit'
      alt='Logo'
      src='/images/logo.png'
      width='65'
      height='65'
    />
  );
};

export default Logo;
