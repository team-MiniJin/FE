import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { ScheduleT } from '@/widgets/create-plan/types/create-plan';
import { createPlanFormSchema } from '@/widgets/create-plan/schema/create-plan-form-schema';

export const useCreatePlan = () => {
  const [schedules, setSchedules] = useState<ScheduleT[][]>(
    Array.from(new Array(30), () => [])
  );
  const [dateOfDays, setDateOfDays] = useState<Date[]>([new Date()]);

  const form = useForm<z.infer<typeof createPlanFormSchema>>({
    resolver: zodResolver(createPlanFormSchema),
    defaultValues: {
      user_id: 0,
      plan_name: '',
      theme: '',
      start_date: new Date(),
      end_date: new Date(),
      scope: true,
      number_of_members: 0,
      schedule: [],
    },
  });
  const { control } = form;

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
    update: updateSchedule,
  } = useFieldArray({
    control,
    name: 'schedule',
  });

  const onSubmit = (values: z.infer<typeof createPlanFormSchema>) => {
    // console.log(values);
  };

  // const queryClient = useQueryClient();
  // const { data, status, } = useMutation({
  //   mutationFn: () => createPlan(plan),
  //   onMutate: async () => {
  //     await queryClient.cancelQueries({ queryKey: ['plans'], exact: true });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['plans'], exact: true });
  //   },
  // });
  // return { data, status };
  return {
    form,
    onSubmit,
    dateOfDays,
    setDateOfDays,
    schedules,
    setSchedules,
    scheduleFields,
    appendSchedule,
    removeSchedule,
    updateSchedule,
  };
};
