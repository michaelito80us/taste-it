import { BsPeopleFill, BsPersonFill } from 'react-icons/bs';
import manageAttendee from '../../../../lib/manageAttendee';

const Rsvp = ({ event, setAttendee, currentAttendee }) => {
  console.log({ currentAttendee });

  async function handle2() {
    if (
      currentAttendee.current.numberOfSeats === 2 ||
      (event.hasMaxAttendees && event.maxAttendees - event.totalAttendees < 2)
    )
      return;

    console.log('handle2');
    try {
      const res = await manageAttendee(event.id, 2);
      console.log({ res });
      setAttendee(res.attendee);
    } catch (error) {
      console.log(error);
    }
  }

  async function handle1() {
    if (
      currentAttendee.current.numberOfSeats === 1 ||
      (event.hasMaxAttendees && event.maxAttendees - event.totalAttendees < 1)
    )
      return;

    console.log('handle1');
    try {
      const res = await manageAttendee(event.id, 1);
      console.log({ res });
      setAttendee(res.attendee);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNotGoing() {
    if (currentAttendee.current.numberOfSeats === 0) return;
    console.log('handleNotGoing');
    try {
      const res = await manageAttendee(event.id, 0);
      console.log({ res });
      setAttendee(res.attendee);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex items-center w-full pt-2 '>
        <div className='flex-grow'>RSVP for how many:</div>
        <button
          onClick={handleNotGoing}
          className={`mr-3 flex flex-col items-center justify-center h-10 text-sm border rounded-md w-14
            ${
              currentAttendee.current.numberOfSeats === 0
                ? 'bg-sec text-tst-bg '
                : ' '
            }
          `}
        >
          <div className='leading-3 pb-[2px]'>Not</div>
          <div className='leading-3'>Going</div>
        </button>
        <button
          onClick={handle1}
          className={`mr-3 flex flex-col items-center justify-center h-10 text-sm border rounded-md w-14
            ${
              currentAttendee.current.numberOfSeats === 1
                ? 'bg-sec text-tst-bg  '
                : event.hasMaxAttendees &&
                  event.maxAttendees - event.totalAttendees < 1
                ? 'opacity-25 '
                : ' '
            }
          `}
          disabled={
            event.hasMaxAttendees &&
            event.maxAttendees - event.totalAttendees < 1
          }
        >
          <BsPersonFill className='text-lg ' />
        </button>
        <button
          onClick={handle2}
          className={`flex items-center justify-center h-10 text-sm border rounded-md w-14
            ${
              currentAttendee.current.numberOfSeats === 2
                ? 'bg-sec text-tst-bg '
                : event.hasMaxAttendees &&
                  event.maxAttendees - event.totalAttendees < 2
                ? 'opacity-25 '
                : ' '
            }
          `}
          disabled={
            event.hasMaxAttendees &&
            event.maxAttendees - event.totalAttendees < 2
          }
        >
          <BsPersonFill className='text-lg' />
          <BsPersonFill className='text-lg' />
        </button>
      </div>
    </>
  );
};

export default Rsvp;
