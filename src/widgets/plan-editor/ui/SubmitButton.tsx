import { Button } from '@/components/ui/button';
import useCreatePlanStore from '../store/usePlanEditorStore';

export default function SubmitButton() {
  const { isEditing, isRegistration } = useCreatePlanStore();
  return (
    <Button
      type="button"
      className="w-full  bg-[--brand-main-color] hover:bg-[--brand-sub-color]"
      disabled={isEditing || isRegistration}
    >
      만들기
    </Button>
  );
}
