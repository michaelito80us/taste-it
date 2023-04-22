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
      credentials: 'include',
    });
    return await res.json();
  } catch (error) {
    console.error('Login Error:', error);
  }
}
