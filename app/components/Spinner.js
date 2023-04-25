'use client';

import Image from 'next/image';

const Spinner = ({ message, img }) => {
  return (
    <>
      <div className='fixed top-0 bottom-0 left-0 right-0 z-[90] w-screen h-screen bg-tst-bg'>
        <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] w-screen h-screen bg-pri/80'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <Image
              src='/images/spinner.png'
              className='w-20 h-20'
            />
            {message && (
              <p
                className={
                  'mt-4 text-lg' + message ? 'text-white' : 'text-transparent'
                }
              >
                {message ? message : ''}
              </p>
            )}
            {img && (
              <Image
                className='w-32 pt-10'
                src='/images/logo.png'
                alt='spinner'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
