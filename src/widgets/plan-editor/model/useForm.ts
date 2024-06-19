import { zodResolver } from '@hookform/resolvers/zod';
import {
  SubmitHandler,
  useFieldArray,
  useForm as useReactHookForm,
} from 'react-hook-form';
import { useEffect } from 'react';
import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import { eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { EditorPlanT, PostNewPlanT } from '../types/plan-editor-type';
import { planEditorFormPlanSchema } from '../schema/plan-editor-schema';
import usePlanEditorStore from '../store/usePlanEditorStore';
import postNewPlan from '../api/postNewPlan';
import createNewPlanData from '../utils/createNewPlanData';

export const useForm = (plan: PlanDetailT | undefined) => {
  const { setDateOfDays } = usePlanEditorStore();
  const router = useRouter();
  const initializeDates = (plan: PlanDetailT | undefined) => {
    if (plan) {
      const startDate = new Date(plan.start_date);
      const endDate = new Date(plan.end_date);
      const dates = eachDayOfInterval({ start: startDate, end: endDate });
      setDateOfDays(dates);
    } else {
      setDateOfDays([new Date()]);
    }
  };

  useEffect(() => {
    initializeDates(plan);
  }, [setDateOfDays, plan]);

  const form = useReactHookForm<EditorPlanT>({
    resolver: zodResolver(planEditorFormPlanSchema),
    defaultValues: {
      plan_name: plan ? plan.plan_name : '',
      theme: plan ? plan.theme : '',
      start_date: plan ? new Date(plan.start_date) : new Date(),
      end_date: plan ? new Date(plan.end_date) : new Date(),
      scope: plan ? plan.scope : true,
      number_of_members: plan ? plan.number_of_members : 1,
      schedules: plan ? plan.schedules : [],
    },
  });

  const { control, reset } = form;

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
    update: updateSchedule,
  } = useFieldArray({
    control,
    name: 'schedules',
  });

  const onSubmit: SubmitHandler<EditorPlanT> = async (values) => {
    const { trigger } = form;
    const isValid = await trigger([
      'plan_name',
      'theme',
      'start_date',
      'end_date',
      'scope',
      'number_of_members',
    ]);

    if (!isValid) {
      console.log('Validation failed');
      return;
    }

    const data: PostNewPlanT = createNewPlanData(values);
    const result = await postNewPlan(data);
    console.log(result);
    router.push('/my-travels');
  };

  const resetForm = (plan: PlanDetailT | undefined) => {
    reset({
      plan_name: plan ? plan.plan_name : '',
      theme: plan ? plan.theme : '',
      start_date: plan ? new Date(plan.start_date) : new Date(),
      end_date: plan ? new Date(plan.end_date) : new Date(),
      scope: plan ? plan.scope : true,
      number_of_members: plan ? plan.number_of_members : 0,
      schedules: plan ? plan.schedules : [],
    });
    initializeDates(plan);
  };

  return {
    form,
    scheduleFields,
    appendSchedule,
    removeSchedule,
    updateSchedule,
    onSubmit,
    resetForm,
  };
};
