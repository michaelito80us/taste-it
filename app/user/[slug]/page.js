'use client';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Logo from './components/navbar/Logo';
import Navbar from './components/navbar/Navbar';

export default function page() {
  const { authenticatedUser } = useContext(UserContext);

  console.log(authenticatedUser);

  return (
    <>
      {authenticatedUser && <div>Logged in as {authenticatedUser.name}</div>}
      <div className='flex justify-center py-4 mx-auto'>
        <Logo />
      </div>
      <Navbar />
    </>
  );
}
