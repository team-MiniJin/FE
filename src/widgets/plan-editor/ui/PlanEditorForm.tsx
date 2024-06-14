'use client';

import { Form } from '@/components/ui/form';
import { DateCards } from '@/shared';
import { format } from 'date-fns';
import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import AddPlanDateButton from './date/AddPlanDateButton';
import ThemeSelect from './ThemeSelect';
import TitleInput from './TitleInput';
import StartDate from './datepicker/StartDate';
import EndDate from './datepicker/EndDate';
import PlaceRegistration from './schedule/ScheduleRegistration';
import ScheduleByDayList from './schedule/ScheduleByDayList';
import CreatePlanCancelButton from './EditorPlanCancelButton';
import SubmitButton from './SubmitButton';
import AddPlaceButton from './schedule/AddScheduleButton';
import useCreatePlanStore from '../store/usePlanEditorStore';
import { useForm } from '../model/useForm';

export default function PlanEditorForm({
  plan = undefined,
}: {
  plan?: PlanDetailT | undefined;
}) {
  const {
    dateOfDays,
    isRegistration,
    isEditing,
    activedDateCardIndex,
    setActivedDateCardIndex,
  } = useCreatePlanStore();
  const {
    form,
    scheduleFields,
    removeSchedule,
    appendSchedule,
    updateSchedule,
    onSubmit,
  } = useForm(plan);
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
            <PlaceRegistration
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
            <CreatePlanCancelButton />
          </div>
          <div className="w-[48%]">
            <SubmitButton />
          </div>
        </div>
      </form>
    </Form>
  );
}
