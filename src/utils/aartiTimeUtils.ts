
export const calculateNextAartiTime = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const nextAarti = new Date();

  // Schedule based on current time
  if (currentHour < 5 || (currentHour === 5 && currentMinute < 15)) {
    // Next is Mangla Aarti at 5:15 AM
    nextAarti.setHours(5, 15, 0);
  } else if (currentHour < 11 || (currentHour === 11 && currentMinute < 15)) {
    // Next is Bhog Aarti at 11:15 AM
    nextAarti.setHours(11, 15, 0);
  } else if (currentHour < 19 || (currentHour === 19 && currentMinute < 15)) {
    // Next is Sandhya Aarti at 7:15 PM
    nextAarti.setHours(19, 15, 0);
  } else if (currentHour < 20 || (currentHour === 20 && currentMinute < 15)) {
    // Next is Shayan Bhog Aarti at 8:15 PM
    nextAarti.setHours(20, 15, 0);
  } else {
    // Next is tomorrow's Mangla Aarti
    nextAarti.setDate(nextAarti.getDate() + 1);
    nextAarti.setHours(5, 15, 0);
  }

  return nextAarti;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
