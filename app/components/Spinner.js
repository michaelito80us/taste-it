'use client';

const Spinner = ({ message, img }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-[rgba(65,58,85,0.8)]'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <img
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
          <img
            className='w-32 pt-10'
            src='/images/logo.png'
          />
        )}
      </div>
    </div>
  );
};

export default Spinner;
