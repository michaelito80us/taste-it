'use client';

const JoinEvent = ({ event }) => {
  return (
    <>
      <button
        disabled={event.totalAttendees >= event.maxAttendees}
        className='h-12 mr-4 border-2 rounded-md grow bg-sec text-tst-bg'
      >
        Join?
      </button>
      <button className='flex items-center justify-around w-12 h-12 text-3xl border-2 rounded-md w bg-sec text-tst-bg'>
        -
      </button>
      <div className='flex items-center justify-around w-16'>0</div>
      <button className='flex items-center justify-around w-12 h-12 text-3xl border-2 rounded-md bg-sec text-tst-bg'>
        +
      </button>
    </>
  );
};

export default JoinEvent;
