import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createPlanFormSchema } from '@/widgets/create-plan/schema/createPlanFormSchema';
import { eachDayOfInterval } from 'date-fns';
import { useState } from 'react';

export const useCreatePlan = () => {
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
      schedule: [
        {
          schedule_date: '', // yyyy-MM-dd 형식의 빈 문자열
          place_category: '',
          place_name: '',
          region: '',
          place_memo: '',
          arrival_time: '', // HH:mm:ss 형식의 빈 문자열
          budget: [
            {
              budget_category: '',
              cost: 0,
              budget_memo: '',
            },
          ],
          x: 0,
          y: 0,
        },
      ],
    },
  });
  const onSubmit = (values: z.infer<typeof createPlanFormSchema>) => {
    console.log(values);
  };

  const addDays = () => {
    const endDate = form.getValues().end_date;
    const startDate = form.getValues().start_date;
    if (!startDate || !endDate) return;

    const nextEndDate = new Date(endDate.setDate(endDate.getDate() + 1));
    form.setValue('end_date', nextEndDate);
    const days = eachDayOfInterval({
      start: startDate,
      end: nextEndDate,
    });
    setDateOfDays(days);
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
  return { form, onSubmit, addDays, dateOfDays, setDateOfDays };
};
