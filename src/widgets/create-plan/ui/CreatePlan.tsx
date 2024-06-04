// import { Form } from '@/components/ui/form';

import CreatePlanForm from './CreatePlanForm';

export default function CreatePlan() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">새 여행 일정 만들기</h2>
      </div>
      <div>
        <CreatePlanForm />
      </div>
    </div>
  );
}
