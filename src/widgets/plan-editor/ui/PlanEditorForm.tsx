'use client';

import { Form } from '@/components/ui/form';
import { DateCards } from '@/shared';
import { format } from 'date-fns';
import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import { useEffect } from 'react';
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

export default function PlanEditorForm({
  plan = undefined,
  setIsEditMode,
  isEditMode,
}: {
  plan?: PlanDetailT | undefined;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
}) {
  const {
    dateOfDays,
    isRegistration,
    isEditing,
    activedDateCardIndex,
    setActivedDateCardIndex,
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
    console.log(activedDateCardIndex);
    console.log(isEditMode);
    if (isEditMode !== undefined) {
      setActivedDateCardIndex(0);
      resetStore();
      resetForm(plan);
    }
  }, [isEditMode]);
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
            activedCardIndex={activedDateCardIndex}
            disabled={isRegistration || isEditing}
            onClickHandler={setActivedDateCardIndex}
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
            !isEditing && <AddPlaceButton appendSchedule={appendSchedule} />
          )}
        </div>
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
