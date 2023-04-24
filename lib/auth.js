import baseUrl from './baseUrl';

export default async function auth() {
  const response = await fetch(`${baseUrl}/auth`, {
    credentials: 'include', // this tells the browser to send the cookie
  });

  return await response.json();
}
