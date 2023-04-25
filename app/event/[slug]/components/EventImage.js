'use client';
import Link from 'next/link';
import { useState } from 'react';
import { BiHome } from 'react-icons/bi';

const EventImage = ({ image }) => {
  const [showImage, setShowImage] = useState(false);

  function stopPropagation(e) {
    e.stopPropagation();
  }
  return (
    <>
      <div className='relative'>
        <Link
          href='/'
          className='absolute z-50 flex items-center justify-around w-10 h-10 p-2 text-white rounded-full bg-ter/50 top-5 left-5'
        >
          <BiHome className='text-2xl' />
        </Link>
        <img
          onClick={() => setShowImage(true)}
          className='relative object-cover w-full h-[35vh] '
          src={image}
          alt='event image'
        />
      </div>
      {showImage && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center pb-20'
          onClick={() => setShowImage(false)}
        >
          <img
            onClick={stopPropagation}
            src={image}
            className='object-cover w-5/6'
            alt='event image'
          />
        </div>
      )}
    </>
  );
};

export default EventImage;
