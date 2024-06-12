import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm as useReactHookForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import { EditorPlanT } from '../types/plan-editor-type';
import { planEditorFormPlanSchema } from '../schema/plan-editor-schema';
import usePlanEditorStore from '../store/usePlanEditorStore';

export const useForm = (plan: PlanDetailT | undefined) => {
  const { setDateOfDays } = usePlanEditorStore();
  useEffect(() => {
    setDateOfDays([new Date()]);
  }, [setDateOfDays]);
  const form = useReactHookForm<EditorPlanT>({
    resolver: zodResolver(planEditorFormPlanSchema),
    defaultValues: {
      plan_name: plan ? plan.plan_name : '',
      theme: plan ? plan.theme : '',
      start_date: plan ? new Date(plan.start_date) : new Date(),
      end_date: plan ? new Date(plan.end_date) : new Date(),
      scope: plan ? plan.scope : true,
      number_of_members: plan ? plan.number_of_members : 0,
      schedules: plan ? plan.schedules : [],
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
    name: 'schedules',
  });

  const onSubmit = (values: z.infer<typeof planEditorFormPlanSchema>) => {};

  return {
    form,
    scheduleFields,
    appendSchedule,
    removeSchedule,
    updateSchedule,
    onSubmit,
  };
};
