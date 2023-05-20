'use client';
import getEvent from '../../../lib/getEvent';
import { dateToString, timeToString } from '../../../util/formatDateTime';
import { BsPeopleFill } from 'react-icons/bs';
import JoinEvent from './components/joinevent';
import ShareEvent from './components/ShareEvent';
import UpdateHistory from '../../../util/updateHistory';
import EventImage from './components/EventImage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserContext } from '../../context/userContext';
import auth from '../../../lib/auth';
import Spinner from '../../components/Spinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import togglePublishEvent from '../../../lib/togglePublishEvent';

const EventPage = () => {
  const [event, setEvent] = useState({});
  const [attendee, setAttendee] = useState({});
  const [showManageOptions, setShowManageOptions] = useState(false);
  const router = useRouter();

  const miniEvent = useRef('');
  const params = useParams();
  const [showSpinner, setShowSpinner] = useState(true);

  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);

  useEffect(() => {
    const checkForAuthenticatedUser = async () => {
      const data = await auth();

      console.log('user data for this event: ', data);

      if (!!data.user) {
        setAuthenticatedUser(data.user);
      }
    };

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

    checkForAuthenticatedUser();
    getEventData();
  }, [attendee]);

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

  function manageOptions(e) {
    e.stopPropagation();
    setShowManageOptions(!showManageOptions);
  }

  async function handleTogglePublish() {
    setShowManageOptions(false);
    setEvent({ ...event, isActive: !event.isActive });

    const res = await togglePublishEvent({
      id: event.id,
      slug: event.slug,
      isActive: event.isActive,
    });

    console.log('res: ', res);
  }

  return (
    <div className='max-w-[500px] mx-auto border-black/200 border-x'>
      {showSpinner && <Spinner img='true' />}
      {miniEvent.current.name && (
        <UpdateHistory miniEvent={miniEvent.current} />
      )}
      <EventImage image={event.pictureUrl} />

      <div
        onClick={() => setShowManageOptions(false)}
        className='mt-[-30px] bg-tst-bg rounded-full relative h-16 p-4 max-w-[500px]'
      >
        <div
          className={` flex ${
            event.eventCreatorId === authenticatedUser.id
              ? 'justify-between'
              : 'justify-end'
          }`}
        >
          {event.eventCreatorId === authenticatedUser.id && (
            <div
              className={`flex items-center justify-center px-2 py-1 mb-2 border-2 rounded-lg text-tst-bg w-fit text-sm	 ${
                event.isActive ? 'bg-sec ' : 'bg-ter/80'
              }`}
            >
              {event.isActive ? 'published' : 'not published'}
            </div>
          )}
          {event.maxAttendees > 0 && (
            <div className='flex items-center justify-center px-2 py-1 mb-2 border-2 rounded-lg text-sec w-fit'>
              max: {event.maxAttendees}
              <div className='ml-2 text-sec'>
                <BsPeopleFill />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='p-4'>
        <div className='mb-3 text-2xl font-bold tracking-wide capitalize break-normal text-pri'>
          {event.eventName}
        </div>
        <div className=' text-pri' />
        <div className='flex items-center text-lg'>
          <Image
            src='/images/calendar.png'
            className='w-4 h-4 mr-3'
            alt='calendar icon'
            width={16}
            height={16}
          />
          {event.dateString}
        </div>
        <div className='flex items-center mb-2 text-lg'>
          <Image
            src='/images/time.png'
            className='w-4 h-4 mr-3'
            alt='clock icon'
            width={16}
            height={16}
          />
          {event.timeString}
        </div>
        <div className='flex items-center text-lg'>
          <div className='min-w-[1rem] mr-3'>
            <img
              src='/images/location.png'
              className='h-4 '
              alt='location icon'
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
        {event.description && <div className='mb-1'>Description:</div>}
        <div
          className={`${
            event.eventCreatorId === authenticatedUser.id ? 'pb-44' : 'pb-32'
          }`}
        >
          {event.description}
        </div>
      </div>

      <div
        onClick={() => setShowManageOptions(false)}
        className='fixed bottom-0 flex flex-col items-center max-w-[500px] w-full border-x border-black/200'
      >
        <div className='w-full h-12 bg-gradient-to-t from-tst-bg to-transparent'></div>
        {event.eventCreatorId === authenticatedUser.id && (
          <div className='relative flex justify-end w-full pr-4 bg-tst-bg'>
            <button
              onClick={manageOptions}
              className='px-2 py-1 border rounded border-pri w-fit'
            >
              manage event
            </button>
            {showManageOptions && (
              <div className='absolute flex flex-col items-start px-4 py-2 transition border rounded-md shadow-lg bottom-14 right-10 bg-tst-bg border-pri shadow-pri'>
                <Link
                  href={{
                    pathname: '/createEvent',
                    query: { edit: event.slug },
                  }}
                  className='w-full py-2 text-left'
                >
                  edit event
                </Link>
                <hr className='w-full' />
                <button
                  onClick={() => {}}
                  className='w-full py-2 text-left'
                >
                  delete event
                </button>
                <hr className='w-full' />
                <button className='hidden w-full py-2 text-left'>
                  view attendees
                  <hr className='w-full mt-2' />
                </button>
                <button
                  onClick={handleTogglePublish}
                  className='w-full py-2 text-left'
                >
                  publish/unpublish event
                </button>
              </div>
            )}
          </div>
        )}
        <div className='w-full pt-3 pb-6 bg-tst-bg'>
          <JoinEvent
            event={event}
            setAttendee={setAttendee}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
