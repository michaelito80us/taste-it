let weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function dateToString(date) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const monthOfYear = month[dateObj.getMonth()];
  const dateOfMonth = dateObj.getDate();
  const day = weekday[dateObj.getDay()];
  const dateStr = `${day}, ${monthOfYear} ${dateOfMonth}, ${year}`;
  return dateStr;
}

export function timeToString(startTime, endTime) {
  const timeObj1 = new Date(startTime);
  const timeObj2 = new Date(endTime);
  const hour1 = timeObj1.getHours();
  const hour2 = timeObj2.getHours();
  const minute1 = timeObj1.getMinutes();
  const minute2 = timeObj2.getMinutes();
  const timeStr = `${hour1}:${minute1} - ${hour2}:${minute2}`;
  return timeStr;
}
