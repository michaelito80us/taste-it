import baseUrl from './baseUrl';

export default async function togglePublishEvent(event) {
  console.log({ event });
  try {
    const res = await fetch(`${baseUrl}/events`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(event),
      credentials: 'include', // this tells the browser to send the cookie
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
