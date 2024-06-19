'use client';

import { Form } from '@/components/ui/form';
import { DateCards } from '@/shared';
import { format } from 'date-fns';
import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AddPlanDateButton from './days/AddPlanDateButton';
import ThemeSelect from './plan/ThemeSelect';
import TitleInput from './plan/TitleInput';
import StartDate from './plan/StartDate';
import EndDate from './plan/EndDate';
import ScheduleRegistration from './schedule/ScheduleRegistration';
import ScheduleByDayList from './schedule/ScheduleByDayList';
import CreatePlanCancelButton from './plan/EditorPlanCancelButton';
import SubmitButton from './plan/SubmitButton';
import AddPlaceButton from './schedule/AddScheduleButton';
import usePlanEditorStore from '../store/usePlanEditorStore';
import { useForm } from '../model/useForm';
import MemberInput from './plan/MemberInput';
import ScopeRadioGroup from './plan/ScopeRadioGroup';

export default function PlanEditorForm({
  plan = undefined,
  setIsEditMode,
  isEditMode,
}: {
  plan?: PlanDetailT | undefined;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
}) {
  const [loading, setLoading] = useState(true);

  const {
    dateOfDays,
    isRegistration,
    isEditing,
    activatedDateCardIndex,
    setActivatedDateCardIndex,
    resetStore,
  } = usePlanEditorStore();

  const {
    form,
    scheduleFields,
    removeSchedule,
    appendSchedule,
    updateSchedule,
    onSubmit,
    resetForm,
  } = useForm(plan);

  useEffect(() => {
    if (isEditMode !== undefined) {
      setActivatedDateCardIndex(0);
      resetStore();
      resetForm(plan);
    }
  }, [isEditMode]);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-spin">
          <Image
            src="/image/loading.png"
            height={28}
            width={28}
            alt="loading"
          />
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = dateOfDays.map((date) => format(date, 'yyyy-MM-dd'));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ThemeSelect form={form} />
        <TitleInput form={form} />
        <div className="items flex items-end space-x-2">
          <StartDate form={form} dateOfDays={dateOfDays} />
          <span className="flex h-[40px] items-center">~</span>
          <EndDate form={form} />
        </div>
        <div className="flex space-x-2 overflow-hidden">
          <DateCards
            dates={dates}
            activatedCardIndex={activatedDateCardIndex}
            disabled={isRegistration || isEditing}
            onClickHandler={setActivatedDateCardIndex}
          />
          <AddPlanDateButton form={form} />
        </div>
        <div>
          <ScheduleByDayList
            form={form}
            scheduleFields={scheduleFields}
            updateSchedule={updateSchedule}
            removeSchedule={removeSchedule}
          />
        </div>

        <div>
          {isRegistration ? (
            <ScheduleRegistration
              scheduleFields={scheduleFields}
              removeSchedule={removeSchedule}
              updateSchedule={updateSchedule}
              form={form}
            />
          ) : (
            !isEditing && (
              <AddPlaceButton form={form} appendSchedule={appendSchedule} />
            )
          )}
        </div>

        <MemberInput form={form} />
        <ScopeRadioGroup form={form} />

        <div className="!mt-12 flex space-x-[4%] text-center">
          <div className="w-[48%]">
            <CreatePlanCancelButton setIsEditMode={setIsEditMode} />
          </div>
          <div className="w-[48%]">
            <SubmitButton isEditMode={plan !== undefined} />
          </div>
        </div>
      </form>
    </Form>
  );
}
