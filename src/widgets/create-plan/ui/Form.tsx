/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/widgets/create-plan/schema/formSchema';
import useCreatePlan from '@/widgets/create-plan/model/useCreatePlan';

export default function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: '',
      theme: '',
      start_date: '',
      end_date: '',
      plan_budget: 0,
      scope: true,
      number_of_members: 0,
      schedule: [],
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {};
}
