'use client';

import Link from 'next/link';
import { dateToString, timeToString } from '../../../../util/formatDateTime';

const Event = ({ event }) => {
  event.dateString = dateToString(event.startDateTime);
  event.timeString = timeToString(event.startDateTime, event.endDateTime);

  return (
    <Link href={`/event/${event.slug}`}>
      <div className='mx-auto my-4 border rounded-md shadow-md shadow-sec/10 drop-shadow-md'>
        <img
          className='object-cover w-full h-48 rounded-t-md'
          src={event.pictureUrl}
          alt=''
        />
        <div className='p-2'>
          <div className='text-lg font-bold capitalize'>{event.eventName}</div>
          <div>{event.dateString}</div>
          <div>{event.timeString}</div>
          {event.Attendee && <div>Attendees: {event.totalAttendees}</div>}
        </div>
      </div>
    </Link>
  );
};

export default Event;
