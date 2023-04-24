'use client';
import { useEffect } from 'react';

export default function UpdateHistory(item) {
  useEffect(() => {
    let arr = localStorage.getItem('history') || '[]';

    arr = JSON.parse(arr);

    const index = arr.findIndex((object) => {
      return object.slug === item.miniEvent.slug;
    });

    if (index !== -1) {
      arr.splice(index, 1);
    }

    arr = [item.miniEvent, ...arr];

    if (arr.length > 10) {
      arr = arr.slice(0, 10);
    }

    localStorage.setItem('history', JSON.stringify(arr));
  }, []);

  return;
}
