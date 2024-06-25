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
import { useAuth } from '@/shared';
import { useToast } from '@/components/ui/use-toast';
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
  const { jwt } = useAuth();
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
  const { toast } = useToast();
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
    update: updateSchedule,
  } = useFieldArray({
    control,
    name: 'schedules',
  });

  const {
    mutate: mutateCreatePlan,
    isError: isErrorCreatePlan,
    isPending: isPendingCreatePlan,
    isSuccess: isSuccessCreatePlan,
  } = useMutation({
    mutationFn: (data: PostNewPlanT) => postNewPlan(data, jwt as string),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['plans'] }),
        queryClient.invalidateQueries({ queryKey: ['upcomingPlans'] }),
      ]);
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['plans'] }),
        queryClient.refetchQueries({ queryKey: ['upcomingPlans'] }),
      ]);

      router.push(`/my-travels/plan/${data.plan_id}`);
    },
  });

  const {
    mutate: mutateUpdatePlan,
    isError: isErrorUpdatePlan,
    isPending: isPendingUpdatePlan,
    isSuccess: isSuccessUpdatePlan,
  } = useMutation({
    mutationFn: (data: PostNewPlanT) =>
      putPlan(data, plan?.plan_id as number, jwt as string),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['plan', plan?.plan_id.toString()],
        }),
        queryClient.invalidateQueries({ queryKey: ['plans'] }),
        queryClient.invalidateQueries({
          queryKey: ['upcomingPlans'],
        }),
      ]);

      if (setIsEditMode) setIsEditMode(false);
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['plan', plan?.plan_id.toString()],
        }),
        queryClient.refetchQueries({ queryKey: ['plans'] }),
        queryClient.refetchQueries({ queryKey: ['upcomingPlans'] }),
      ]);
      toast({
        title: `여행 일정 ${
          isSuccessCreatePlan ? '생성을' : '수정을'
        } 성공했어요.`,
      });
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
    isErrorCreatePlan,
    isErrorUpdatePlan,
    isPendingCreatePlan,
    isPendingUpdatePlan,
    isSuccessUpdatePlan,
    isSuccessCreatePlan,
  };
};
