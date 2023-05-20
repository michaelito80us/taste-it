import baseUrl from './baseUrl';

export default async function getEvent(slug) {
  try {
    const res = await fetch(`${baseUrl}/events/${slug}`, {
      credentials: 'include',
    });

    if (!res.ok) {
      new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
