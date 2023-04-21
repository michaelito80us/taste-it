import getEvent from '../../../lib/getEvent';
import { dateToString, timeToString } from '../../../util/formatDateTime';
import { BsPeopleFill, BsShareFill } from 'react-icons/bs';
import JoinEvent from './components/joinevent';
import ShareEvent from './components/ShareEvent';
import UpdateHistory from '../../../util/updateHistory';

export async function generateMetadata({ params: { slug } }) {
  const eventData = getEvent(slug);
  const { event } = await eventData;

  return {
    title: event.name,
    description: event.description,
  };
}

const EventPage = async ({ params: { slug } }) => {
  const eventData = getEvent(slug);

  const { event } = await eventData;

  event.dateString = dateToString(event.startDateTime);
  event.timeString = timeToString(event.startDateTime, event.endDateTime);

  console.log(event);

  const miniEvent = {
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
      <UpdateHistory miniEvent={...miniEvent} />
      <img
        className='object-cover w-full h-[35vh]'
        src={event.pictureUrl}
      />
      <div className='mt-[-30px] bg-tst-bg rounded-full z-10 relative h-16 p-4'>
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
          <div className='mb-3'>current attendees: {event.totalAttendees}</div>
          <ShareEvent event={event} />
        </div>
        <div className='mb-1'>Description:</div>
        <div className='mb-5'>{event.description}</div>
        <div className='flex pb-20'>
          <JoinEvent event={event} />
        </div>
      </div>
    </>
  );
};

export default EventPage;
