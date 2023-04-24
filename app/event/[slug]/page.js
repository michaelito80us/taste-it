'use client';
import getEvent from '../../../lib/getEvent';
import { dateToString, timeToString } from '../../../util/formatDateTime';
import { BsPeopleFill, BsShareFill } from 'react-icons/bs';
import JoinEvent from './components/joinevent';
import ShareEvent from './components/ShareEvent';
import UpdateHistory from '../../../util/updateHistory';
import EventImage from './components/EventImage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserContext } from '../../context/userContext';
import auth from '../../../lib/auth';
import Spinner from '../../components/Spinner';

// export async function generateMetadata({ params: { slug } }) {
//   const eventData = getEvent(slug);
//   const { event } = await eventData;

//   return {
//     title: event.name,
//     description: event.description,
//   };
// }

const EventPage = () => {
  const [event, setEvent] = useState({});
  const miniEvent = useRef('');
  const params = useParams();
  const [showSpinner, setShowSpinner] = useState(true);

  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);

  useEffect(() => {
    async function check() {
      const data = await auth();

      console.log({ data });

      if (!data?.error) {
        setAuthenticatedUser(data.user);
      }
    }

    check();

    const getEventData = async () => {
      const eventData = await getEvent(params.slug);
      console.log('eventData: ', eventData);
      setEvent({
        ...eventData.event,
        dateString: dateToString(eventData.event.startDateTime),
        timeString: timeToString(
          eventData.event.startDateTime,
          eventData.event.endDateTime
        ),
      });
      setShowSpinner(false);
    };
    getEventData();
  }, []);

  miniEvent.current = {
    slug: event.slug,
    name: event.eventName,
    date: new Date(event.startDateTime).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    image: event.pictureUrl,
  };

  return (
    <>
      {showSpinner && <Spinner img='true' />}
      {miniEvent.current.name && (
        <UpdateHistory miniEvent={miniEvent.current} />
      )}
      <EventImage image={event.pictureUrl} />

      <div className='mt-[-30px] bg-tst-bg rounded-full relative h-16 p-4 '>
        {event.maxAttendees > 0 && (
          <div className='flex justify-end text-sec'>
            <div className='flex items-center self-end px-2 py-1 border-2 rounded-lg w-fit'>
              max: {event.maxAttendees}
              <div className='ml-2 text-sec'>
                <BsPeopleFill />
              </div>
            </div>
          </div>
        )}
        <div className='mb-3 text-2xl font-bold tracking-wide capitalize break-normal text-pri'>
          {event.eventName}
        </div>
        <div className=' text-pri' />
        <div className='flex items-center text-lg'>
          <img
            src='/images/calendar.png'
            className='w-4 h-4 mr-3'
          />
          {event.dateString}
        </div>
        <div className='flex items-center mb-2 text-lg'>
          <img
            src='/images/time.png'
            className='w-4 h-4 mr-3'
          />
          {event.timeString}
        </div>
        <div className='flex items-center text-lg'>
          <div className='min-w-[1rem] mr-3'>
            <img
              src='/images/location.png'
              className='h-4 '
            />
          </div>
          {event.venueName}
        </div>
        {event.venueAddress && (
          <div className='flex items-center text-lg'>
            <div className='min-w-[1rem] mr-3'> </div>
            <div className=''>{event.venueAddress}</div>
          </div>
        )}
        <progress
          className='w-full h-[2px] rounded-full opacity-30'
          max={event.maxAttendees}
          value={event.totalAttendees}
        />
        <div className='relative'>
          <div className='mb-3'>
            currently signed up: {event.totalAttendees}
          </div>
          <ShareEvent event={event} />
        </div>
        <div className='mb-1'>Description:</div>
        <div className='pb-32'>{event.description}</div>
      </div>

      <div className='fixed bottom-0 flex flex-col items-center'>
        <div className='w-screen h-12 bg-gradient-to-t from-tst-bg to-transparent'></div>
        <div className='pt-3 pb-6 bg-tst-bg'>
          <JoinEvent event={event} />
        </div>
      </div>
    </>
  );
};

export default EventPage;
