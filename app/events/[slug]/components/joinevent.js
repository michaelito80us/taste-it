'use client';

import { useState } from 'react';

const JoinEvent = ({ event }) => {
  const [attendees, setAttendees] = useState(0);

  function handleAdd() {
    attendees < event.maxAttendees &&
      attendees < 2 &&
      setAttendees(attendees + 1);
  }

  function handleSubtract() {
    attendees > 0 && setAttendees(attendees - 1);
  }

  return (
    <>
      {event.totalAttendees === event.maxAttendees ? (
        <div className='flex items-center justify-around w-full h-12 border-2 rounded-md bg-sec text-tst-bg'>
          {' '}
          Sorry, this event is full{' '}
        </div>
      ) : (
        <>
          <button
            disabled={event.totalAttendees >= event.maxAttendees}
            className='h-12 mr-4 border-2 rounded-md grow bg-sec text-tst-bg'
          >
            Join?
          </button>
          <button
            onClick={handleSubtract}
            className='flex items-center justify-around w-12 h-12 text-3xl border-2 rounded-md w bg-sec text-tst-bg'
          >
            -
          </button>
          <div className='flex items-center justify-around w-16'>
            {attendees}
          </div>
          <button
            onClick={handleAdd}
            className='flex items-center justify-around w-12 h-12 text-3xl border-2 rounded-md bg-sec text-tst-bg'
          >
            +
          </button>
        </>
      )}
    </>
  );
};

export default JoinEvent;
