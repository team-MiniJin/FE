import { Button } from '@/components/ui/button';
import useCreatePlanStore from '../store/usePlanEditorStore';

export default function SubmitButton({
  isEditMode = false,
}: {
  isEditMode: boolean;
}) {
  const { isEditing, isRegistration } = useCreatePlanStore();
  return (
    <Button
      type="button"
      className="w-full  bg-[--brand-main-color] hover:bg-[--brand-sub-color]"
      disabled={isEditing || isRegistration}
    >
      {isEditMode ? '수정' : '만들기'}
    </Button>
  );
}
