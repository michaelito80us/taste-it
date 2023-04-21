import baseUrl from './baseUrl';

export default async function login(email, password) {
  try {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include', // this tells the browser to send the cookie
    });
    return await res.json();

    // const response = await axios.post('/api/login', { email, password });
    // setCookie('user', response.data, { path: '/' });
  } catch (error) {
    console.error('Login Error:', error);
  }
}
