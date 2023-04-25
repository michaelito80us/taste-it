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
          alt='event picture'
        />
        <div className='p-2'>
          <div className='text-lg font-bold capitalize'>{event.eventName}</div>
          <div>{event.dateString}</div>
          <div>{event.timeString}</div>
          {event.Attendee && (
            <>
              <div className='relative'>
                <div>Attendees: {event.totalAttendees}</div>
                <div
                  className={`absolute bottom-0 right-0 px-2 py-1 text-sm rounded-md text-tst-bg ${
                    event.isActive ? 'bg-sec ' : 'bg-ter/80'
                  }`}
                >
                  {event.isActive ? 'published' : 'not published'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Event;
