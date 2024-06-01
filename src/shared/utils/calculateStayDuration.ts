export default function calculateStayDuration(
  start_date: string,
  end_date: string
): string {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

  const nights = Math.floor(dayDifference);
  const days = nights + 1;

  return `${nights}박 ${days}일`;
}
