import Link from 'next/link';
import { BiCalendar, BiUser, BiPlus } from 'react-icons/bi';

const Navbar = ({ navbar, onNavbarItemClick }) => {
  return (
    <div className='fixed bottom-0 z-10 w-full bg-white shadow-sm max-w-[500px] mx-auto left-0 right-0 border-x border-black/200'>
      <div className='py-2 border-b-[1px] '>
        <div className='grid grid-cols-3 gap-1 pb-2'>
          <div className='flex justify-around'>
            <button
              className={
                navbar === 'calendar'
                  ? 'border-b-2 border-sec'
                  : 'border-b-2 border-transparent'
              }
              onClick={() => onNavbarItemClick('calendar')}
            >
              <div className='flex flex-col items-center'>
                <BiCalendar size={24} />
                calendar
              </div>
            </button>
          </div>
          <div className='flex justify-around'>
            <Link href='/createEvent'>
              <div className='flex flex-col items-center border-2 p-2 drop-shadow-lg rounded-xl mt-[-35px] bg-tst-bg w-fit'>
                <BiPlus size={50} />
              </div>
            </Link>
          </div>
          <div className='flex justify-around'>
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
    </div>
  );
};

export default Navbar;
