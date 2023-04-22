'use client';
import AllEvents from './AllEvents';

const Profile = () => {
  return (
    <>
      <AllEvents
        type='creator'
        message='These are the events you have created'
      />
    </>
  );
};

export default Profile;
