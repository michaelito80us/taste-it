import Link from 'next/link';
import { BiCalendar, BiUser, BiPlus } from 'react-icons/bi';

const Navbar = ({ navbar, onNavbarItemClick }) => {
  return (
    <div className='fixed bottom-0 z-10 w-full bg-white shadow-sm'>
      <div className='py-2 border-b-[1px]'>
        <div className='flex flex-row items-center gap-3 justify-evenly md:gap-0'>
          <button
            className={
              navbar === 'calendar'
                ? 'border-b-2 border-sec'
                : 'border-b-2 border-transparent '
            }
            onClick={() => onNavbarItemClick('calendar')}
          >
            <div className='flex flex-col items-center'>
              <BiCalendar size={24} />
              calendar
            </div>
          </button>
          <Link href='/createEvent'>
            <div className='flex flex-col items-center mb-4 border-2 rounded-3xl'>
              <BiPlus size={50} />
            </div>
          </Link>
          <button
            className={
              navbar === 'profile'
                ? 'border-b-2 border-sec'
                : 'border-b-2 border-transparent'
            }
            onClick={() => onNavbarItemClick('profile')}
          >
            <div className={'flex flex-col items-center'}>
              <BiUser size={24} />
              profile
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
