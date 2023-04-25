import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const Login = ({ email, password, onSubmit, setShowRegister }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 py-8 bg-white rounded-lg shadow w-80 px-7 text-pri'>
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => (email.current = e.target.value)}
          className='px-4 py-2 mb-2 border rounded-md border-pri'
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => (password.current = e.target.value)}
          className='px-4 py-2 mb-2 border rounded-md border-pri'
        />
        <button
          className='px-4 py-2 mb-2 font-bold border rounded-md text-pri bg-sec/70'
          type='submit'
        >
          Sign in
        </button>

        <div className='flex justify-center pt-4 text-sm text-pri '>
          {`Don't have an account?`}
          <span
            onClick={() => setShowRegister(true)}
            className='pl-1 font-bold'
          >
            Register Now
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
