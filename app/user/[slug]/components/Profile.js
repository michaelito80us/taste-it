'use client';

import { useState } from 'react';

const Profile = () => {
  const [upcoming, setUpcoming] = useState(true);
  return (
    <div className='p-4'>
      <p>These are the events you have created</p>

      <div className='flex justify-between px-12 mt-4 '>
        <div
          onClick={() => setUpcoming(true)}
          className={upcoming ? 'border-b-2 font-bold border-ter' : ''}
        >
          upcoming
        </div>
        <div
          className={!upcoming ? 'border-b-2 border-ter font-bold' : ''}
          onClick={() => setUpcoming(false)}
        >
          past
        </div>
      </div>
    </div>
  );
};

export default Profile;
