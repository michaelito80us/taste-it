'use client';

import { useEffect, useState } from 'react';
import {
  getEventsByCreator,
  getEventsByAttendee,
} from '../../../../lib/getEventsByUser';
import EventList from './EventList';

const AllEvents = ({ type, message }) => {
  const [upcoming, setUpcoming] = useState(true);
  const [events, setEvents] = useState([]);

  // get events from db

  useEffect(() => {
    if (type === 'creator') {
      const getCreatorEvents = async () => {
        const data = await getEventsByCreator();
        setEvents(data);
      };

      getCreatorEvents();
    } else if (type === 'attendee') {
      const getAttendeeEvents = async () => {
        const data = await getEventsByAttendee();
        setEvents(data);
      };
      getAttendeeEvents();
    }
  }, []);

  console.log('events', events);

  return (
    <div className='p-4 pb-28'>
      <p>{message}</p>

      <div className='flex justify-between px-12 mt-4 '>
        <div
          onClick={() => setUpcoming(true)}
          className={upcoming ? 'border-b-2 font-bold border-ter' : ''}
        >
          upcoming
        </div>
        <div
          className={!upcoming ? 'border-b-2 border-ter font-bold' : ''}
          onClick={() => setUpcoming(false)}
        >
          past
        </div>
      </div>
      <div className='pt-3'>
        {upcoming && (
          <EventList
            events={events.upcoming}
            future={true}
          />
        )}
        {!upcoming && (
          <EventList
            events={events.past}
            future={false}
          />
        )}
      </div>
    </div>
  );
};

export default AllEvents;
