import { ScheduleT } from '../types/plan';

export const getCoordinates = (schedules: ScheduleT[]): [number, number][] => {
  return schedules.map((schedule) => {
    return [schedule.x, schedule.y];
  });
};
