import baseUrl from './baseUrl';

export default async function login(email, password, name) {
  try {
    if (name) {
      const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        credentials: 'include',
      });

      return await res.json();
    } else {
      const res = await fetch(`${baseUrl}/login`, {
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
    }
  } catch (error) {
    console.error('Login Error:', error);
  }
}
