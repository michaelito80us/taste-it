'use client';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import AuthenticateUser from './../../components/AuthenticateUser';
import { useRouter } from 'next/navigation';

export default function UserMainPage() {
  const { authenticatedUser } = useContext(UserContext);
  const [navbar, setNavbar] = useState('calendar');
  const router = useRouter();

  console.log('authenticatedUser: ', authenticatedUser);

  function handleClick(item) {
    setNavbar(item);
  }

  useEffect(() => {
    if (!authenticatedUser.id) {
      router.push('/auth/login');
    }
  }, []);

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
