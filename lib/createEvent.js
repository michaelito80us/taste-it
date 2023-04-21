import baseUrl from './baseUrl';

export default async function createEvent(formData) {
  const res = await fetch(`${baseUrl}/events`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // this tells the browser to send the cookie
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}
