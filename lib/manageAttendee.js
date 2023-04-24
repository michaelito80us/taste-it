import baseUrl from './baseUrl';

export default async function manageAttendee(eventId, numberOfSeats) {
  try {
    const res = await fetch(`${baseUrl}/attendees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        numberOfSeats,
      }),
      credentials: 'include',
    });
    return await res.json();
  } catch (error) {
    console.error('Login Error:', error);
  }
}
