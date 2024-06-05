'use client';

import { useCreatePlan } from '@/widgets/create-plan/model/useCreatePlan';
import { Form } from '@/components/ui/form';
import PlanDateList from './PlanDateList';
import AddPlanDateButton from './AddPlanDateButton';
import AddPlaceButton from './AddPlaceButton';
import ThemeSelect from './ThemeSelect';
import TitleInput from './TitleInput';
import StartDate from './StartDate';
import EndDate from './EndDate';

export default function CreatePlanForm() {
  const { form, onSubmit, addDays, dateOfDays } = useCreatePlan();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ThemeSelect form={form} />
        <TitleInput form={form} />
        <div className="items flex space-x-2">
          <StartDate form={form} />
          <span>~</span>
          <EndDate form={form} />
        </div>
        <div className="flex space-x-2 overflow-hidden">
          <PlanDateList dateOfDays={dateOfDays} />
          <AddPlanDateButton addDays={addDays} />
        </div>
        <div>
          <div className="border"></div>
          <AddPlaceButton />
        </div>
      </form>
    </Form>
  );
}
