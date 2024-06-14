import { PlanDetailT } from '@/widgets/plan-detail/type/plan-detail';
import PlanEditorForm from './PlanEditorForm';

export default function PlanEditor({
  mode,
  plan,
  isEditMode,
  setIsEditMode,
}: {
  mode: 'edit' | 'create';
  plan?: PlanDetailT;
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">
          {(mode === 'edit' && '여행 일정 수정') ||
            (mode === 'create' && '새 여행 일정 만들기')}
        </h2>
      </div>
      <div className=" h-[1px] w-full border-b" />
      <div>
        <PlanEditorForm
          plan={plan}
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}