const calculateDday = (startDate: string): number => {
  const today = new Date();
  const start = new Date(startDate);

  const diffInMs = start.getTime() - today.getTime();

  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};
export default calculateDday;
