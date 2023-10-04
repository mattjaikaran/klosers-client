export function formattedDate(datetime: string) {
  const date = new Date(datetime);
  return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
}

export function formattedTime(datetime: string) {
  const date = new Date(datetime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
