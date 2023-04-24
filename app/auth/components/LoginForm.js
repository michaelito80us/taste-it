'use client';

import { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const email = useRef('');
  const password = useRef('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [cookies, setCookie] = useCookies(['user']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('/api/login', { email, password });
    //   setCookie('user', response.data, { path: '/' });
    // } catch (error) {
    //   console.error('Login Error:', error);
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='gap-2 py-4 bg-white rounded-md shadow px-7'>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => (email.current = e.target.value)}
          />
          <input
            placeholder='Password'
            onChange={(e) => (password.current = e.target.value)}
          />
          <button type='submit'>Login</button>
        </div>
      </form>

      {/* <TextBox
            labelText='Email'
            type='email'
            onChange={(e) => (email.current = e.target.value)}
          />

          <TextBox
            labelText='Password'
            type='password'
            onChange={(e) => (password.current = e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            text='Login'
          /> */}
    </>
  );
};

export default LoginForm;
