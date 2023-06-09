import Image from 'next/image';
import Link from 'next/link';

const MiniEvent = ({ event }) => {
  return (
    <>
      <Link href={`/event/${event.slug}`}>
        <div className='flex border-2 rounded-lg w-48 h-16 min-w-[12rem] mr-3'>
          <img
            src={event.image}
            alt='event image'
            className='object-cover w-2/6 mr-2 rounded-l-lg'
          />
          <div className='flex flex-col w-4/6 pr-2 justify-evenly'>
            <div className='overflow-hidden capitalize truncate'>
              {event.name}
            </div>
            <div className='text-sm '>{event.date}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MiniEvent;
