'use client';

import LogInToRsvp from './LogInToRsvp';
import Rsvp from './Rsvp';

import { useContext, useState, useRef } from 'react';
import { UserContext } from '../../../context/userContext';

const JoinEvent = ({ event, setAttendee }) => {
  const { authenticatedUser } = useContext(UserContext);
  const currentAttendee = useRef('');

  if (event.isUserGoing) {
    const attendeeData = event.Attendee.find(
      (attendee) => attendee.userId === authenticatedUser.id
    );

    currentAttendee.current = attendeeData;
  }

  return (
    <>
      <div className='flex w-full px-4'>
        {!event.isUserGoing &&
        event.maxAttendees > 0 &&
        event.totalAttendees === event.maxAttendees ? (
          <div className='flex items-center justify-around w-full h-12 border-2 rounded-md opacity-50 bg-sec text-tst-bg'>
            {' '}
            Sorry, this event is full{' '}
          </div>
        ) : (
          <>
            {!authenticatedUser.id && <LogInToRsvp slug={event.slug} />}
            {authenticatedUser.id && (
              <Rsvp
                event={event}
                setAttendee={setAttendee}
                currentAttendee={currentAttendee}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default JoinEvent;
