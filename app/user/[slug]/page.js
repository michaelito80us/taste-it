'use client';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import AuthenticateUser from './../../components/AuthenticateUser';

export default function page() {
  const { authenticatedUser } = useContext(UserContext);
  const [navbar, setNavbar] = useState('calendar');

  console.log('authenticatedUser: ', authenticatedUser);

  function handleClick(item) {
    setNavbar(item);
  }

  return (
    <>
      {!authenticatedUser && <AuthenticateUser />}
      <div className='sticky top-0 z-50 flex justify-center py-4 mx-auto bg-tst-bg'>
        <Logo />
      </div>
      {navbar === 'calendar' && <Calendar />}
      {navbar === 'profile' && <Profile />}

      <Navbar
        navbar={navbar}
        onNavbarItemClick={(item) => handleClick(item)}
      />
    </>
  );
}
