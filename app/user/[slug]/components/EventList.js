'use client';
import Event from './Event';

const EventList = ({ events, future }) => {
  console.log('list of events', events);
  return (
    <>
      {typeof events === 'object' && events.length > 0 ? (
        events.map((event) => (
          <Event
            key={event.slug}
            event={event}
          />
        ))
      ) : (
        <div className='mt-10 text-center text-ter'>
          You have no {future ? 'upcoming' : 'past'} events
        </div>
      )}
    </>
  );
};

export default EventList;
