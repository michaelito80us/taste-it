import baseUrl from './baseUrl';

export default async function auth() {
  const res = await fetch(`${baseUrl}/auth`, {
    credentials: 'include',
  });

  return await res.json();
}
