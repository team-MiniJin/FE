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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditorPlanT, PostNewPlanT } from '../types/plan-editor-type';
import { planEditorFormPlanSchema } from '../schema/plan-editor-schema';
import usePlanEditorStore from '../store/usePlanEditorStore';
import postNewPlan from '../api/postNewPlan';
import createNewPlanData from '../utils/createNewPlanData';
import putPlan from '../api/putPlan';

export const useForm = (
  plan: PlanDetailT | undefined,
  isEditMode: boolean | undefined,
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { setDateOfDays } = usePlanEditorStore();
  const router = useRouter();
  const queryClient = useQueryClient();

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
  }, [plan]);

  const form = useReactHookForm<EditorPlanT>({
    resolver: zodResolver(planEditorFormPlanSchema),
    defaultValues: {
      plan_name: plan ? plan.plan_name : '',
      theme: plan ? plan.theme : '',
      start_date: plan ? new Date(plan.start_date) : new Date(),
      end_date: plan ? new Date(plan.end_date) : new Date(),
      scope: plan ? plan.scope : true,
      number_of_members: plan ? plan.number_of_members : 1,
      schedules: plan
        ? plan.schedules.map((schedule, idx) => ({
            idx,
            place_category: schedule.place_category,
            place_name: schedule.place_name,
            place_addr: schedule.place_addr,
            region: schedule.region,
            place_memo: schedule.place_memo || '',
            arrival_time: schedule.arrival_time,
            budgets: (schedule.budgets || []).map((budget) => ({
              budget_category: budget.budget_category,
              cost: budget.cost.toString(),
            })),
            x: schedule.x,
            y: schedule.y,
            schedule_day: schedule.schedule_days,
          }))
        : [],
    },
  });

  const { control, reset, trigger } = form;

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
    update: updateSchedule,
  } = useFieldArray({
    control,
    name: 'schedules',
  });

  const { mutate: mutateCreatePlan } = useMutation({
    mutationFn: (data: PostNewPlanT) => postNewPlan(data),
    onSuccess: (data) => {
      queryClient
        .invalidateQueries({ queryKey: ['plan', plan?.plan_id] })
        .then(() => {
          router.push(`/my-travels/plan/${data.plan_id}`);
        });
    },
  });

  const { mutate: mutateUpdatePlan } = useMutation({
    mutationFn: (data: PostNewPlanT) => putPlan(data, plan?.plan_id as number),
    onSuccess: () => {
      if (setIsEditMode) setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['plan'] });
    },
  });

  const onSubmit: SubmitHandler<EditorPlanT> = async (values) => {
    const isValid = await trigger([
      'plan_name',
      'theme',
      'start_date',
      'end_date',
      'scope',
      'number_of_members',
    ]);

    if (!isValid) {
      console.error('Validation failed');
      return;
    }

    const data: PostNewPlanT = createNewPlanData(values);

    if (isEditMode) {
      mutateUpdatePlan(data);
    } else {
      mutateCreatePlan(data);
    }
  };

  const resetForm = (plan: PlanDetailT | undefined) => {
    reset({
      plan_name: plan ? plan.plan_name : '',
      theme: plan ? plan.theme : '',
      start_date: plan ? new Date(plan.start_date) : new Date(),
      end_date: plan ? new Date(plan.end_date) : new Date(),
      scope: plan ? plan.scope : true,
      number_of_members: plan ? plan.number_of_members : 0,
      schedules: plan
        ? plan.schedules.map((schedule, idx) => ({
            idx,
            place_category: schedule.place_category,
            place_name: schedule.place_name,
            place_addr: schedule.place_addr,
            region: schedule.region,
            place_memo: schedule.place_memo || '',
            arrival_time: schedule.arrival_time,
            budgets: (schedule.budgets || []).map((budget) => ({
              budget_category: budget.budget_category,
              cost: budget.cost.toString(),
            })),
            x: schedule.x,
            y: schedule.y,
            schedule_day: schedule.schedule_days,
          }))
        : [],
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
