import baseUrl from './baseUrl';

export async function getEventsByCreator() {
  const res = await fetch(`${baseUrl}/events/creator`, {
    credentials: 'include',
  });

  if (!res.ok) {
    new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

export async function getEventsByAttendee() {
  const res = await fetch(`${baseUrl}/events/attendee`, {
    credentials: 'include',
  });

  if (!res.ok) {
    new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}
