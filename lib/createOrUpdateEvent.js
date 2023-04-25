import baseUrl from './baseUrl';

export default async function createOrUpdateEvent(formData) {
  console.log({ formData });
  try {
    const res = await fetch(`${baseUrl}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),
      credentials: 'include', // this tells the browser to send the cookie
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
