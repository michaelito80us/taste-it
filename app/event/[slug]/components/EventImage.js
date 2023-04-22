'use client';
import { useState } from 'react';

const EventImage = ({ image }) => {
  const [showImage, setShowImage] = useState(false);

  function stopPropagation(e) {
    e.stopPropagation();
  }
  return (
    <>
      <img
        onClick={() => setShowImage(true)}
        className='relative object-cover w-full h-[35vh] '
        src={image}
      />
      {showImage && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center pb-20'
          onClick={() => setShowImage(false)}
        >
          <img
            onClick={stopPropagation}
            src={image}
            className='object-cover w-5/6'
          />
        </div>
      )}
    </>
  );
};

export default EventImage;
