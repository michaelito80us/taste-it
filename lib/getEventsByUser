import baseUrl from './baseUrl';

export default async function getEvent(slug) {
  const res = await fetch(`${baseUrl}/events/${slug}`, {
    credentials: 'include', // this tells the browser to send the cookie
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}
