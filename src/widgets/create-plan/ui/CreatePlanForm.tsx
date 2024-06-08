'use client';

import { useCreatePlan } from '@/widgets/create-plan/model/useCreatePlan';
import { Form } from '@/components/ui/form';
import PlanDateList from './PlanDateList';
import AddPlanDateButton from './AddPlanDateButton';
import ThemeSelect from './ThemeSelect';
import TitleInput from './TitleInput';
import StartDate from './StartDate';
import EndDate from './EndDate';
import PlaceRegistration from './PlaceRegistration';
import ScheduleByDayList from './ScheduleByDayList';
import CreatePlanCancelButton from './CreatePlanCancelButton';
import SubmitButton from './SubmitButton';
import AddPlaceButton from './AddPlaceButton';
import useCreatePlanStore from '../store/createPlanStore';

export default function CreatePlanForm() {
  const { isRegistration, isEditing } = useCreatePlanStore();
  const {
    form,
    onSubmit,
    setDateOfDays,
    dateOfDays,
    scheduleFields,
    removeSchedule,
    appendSchedule,
    updateSchedule,
  } = useCreatePlan();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ThemeSelect form={form} />
        <TitleInput form={form} />
        <div className="items flex items-end space-x-2">
          <StartDate
            form={form}
            setDateOfDays={setDateOfDays}
            dateOfDays={dateOfDays}
          />
          <span className="flex h-[40px] items-center">~</span>
          <EndDate form={form} setDateOfDays={setDateOfDays} />
        </div>
        <div className="flex space-x-2 overflow-hidden">
          <PlanDateList dateOfDays={dateOfDays} />
          <AddPlanDateButton form={form} setDateOfDays={setDateOfDays} />
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
