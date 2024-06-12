import { eachDayOfInterval, format } from 'date-fns';

const getDateArray = (start_date: string, end_date: string): string[] => {
  const start = new Date(start_date);
  const end = new Date(end_date);
  const interval = eachDayOfInterval({ start, end });
  return interval.map((date) => format(date, 'yyyy-MM-dd'));
};

export default getDateArray;
