'use client';
import { useEffect, useState } from 'react';
import MiniEvent from './MiniEvent';
import { getEventsByAttendee } from '../../../../lib/getEventsByUser';
import AllEvents from './AllEvents';

const Calendar = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [events, setEvents] = useState([]);

  // get events from db

  useEffect(() => {
    const getAttendeeEvents = async () => {
      const data = await getEventsByAttendee();
      setEvents(data);
    };

    getAttendeeEvents();
  }, []);

  console.log('events', events);

  return (
    <>
      {history.length > 0 && (
        <div className='h-32 p-4'>
          <div className='pb-2'>recently viewed:</div>
          <div className='flex overflow-x-scroll no-scrollbar '>
            {history.map((event) => (
              <MiniEvent
                key={event.slug}
                event={event}
              />
            ))}
          </div>
        </div>
      )}
      <AllEvents
        type='attendee'
        message="events you RSVP'd to:"
      />
    </>
  );
};

export default Calendar;
