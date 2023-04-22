'use client';
import { useState } from 'react';
import MiniEvent from './MiniEvent';

const Calendar = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  // get events from db

  return (
    <>
      <div className='h-32 p-4'>
        <div className='pb-2 text-lg'>recently viewed:</div>
        {history && (
          <div className='flex overflow-x-scroll no-scrollbar '>
            {history.map((event) => (
              <MiniEvent
                key={event.slug}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
      <div className='p-4 pb-20'>
        <div className='pb-2 text-lg'>your upcoming events:</div>
        <div className='overflow-y-auto overscroll-none'>
          all the events come here
        </div>
      </div>
    </>
  );
};

export default Calendar;
