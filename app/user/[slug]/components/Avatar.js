'use client';

import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      className='rounded-full'
      alt='Avatar'
      src='/images/placeholder.png'
      width='80'
      height='80'
    />
  );
};

export default Avatar;
