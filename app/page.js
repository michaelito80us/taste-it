import Logo from './components/navbar/Logo';
import Navbar from './components/navbar/Navbar';

export default function Home() {
  return (
    <>
      <div className='flex justify-center py-4 mx-auto'>
        <Logo />
      </div>
      <Navbar />
    </>
  );
}
