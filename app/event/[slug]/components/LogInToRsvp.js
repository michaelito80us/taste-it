import Link from 'next/link';

const LogInToRsvp = ({ slug }) => {
  return (
    <Link
      href={{
        pathname: '/auth/login',
        query: { redirectBack: slug },
      }}
      className='flex items-center justify-around w-full h-12 border-2 rounded-md bg-sec text-tst-bg'
    >
      <button> Log in to RSVP to this event </button>
    </Link>
  );
};

export default LogInToRsvp;
