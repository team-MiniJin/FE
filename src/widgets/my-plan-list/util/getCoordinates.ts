import { MyPlanScheduleT } from '../types/myPlans';

export const getCoordinates = (
  schedules: MyPlanScheduleT[]
): [number, number][] => {
  return schedules.map((schedule) => {
    return [schedule.x, schedule.y];
  });
};
