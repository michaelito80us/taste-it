import baseUrl from './baseUrl';

export default async function auth() {
  const res = await fetch(`${baseUrl}/auth`, {
    credentials: 'include', // this tells the browser to send the cookie
  });

  return await res.json();
}
