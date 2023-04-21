import Link from 'next/link';
import { BiCalendar, BiUser, BiPlus } from 'react-icons/bi';

const Navbar = () => {
  return (
    <div className='fixed bottom-0 z-10 w-full bg-white shadow-sm'>
      <div className='py-2 border-b-[1px]'>
        <div className='flex flex-row items-center gap-3 justify-evenly md:gap-0'>
          <Link href='/calendar'>
            <div className='flex flex-col items-center'>
              <BiCalendar size={24} />
              calendar
            </div>
          </Link>
          <Link href='/createEvent'>
            <div className='flex flex-col items-center mb-4 border-2 rounded-3xl'>
              <BiPlus size={50} />
            </div>
          </Link>
          <Link href='/profile'>
            <div className='flex flex-col items-center'>
              <BiUser size={24} />
              profile
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
