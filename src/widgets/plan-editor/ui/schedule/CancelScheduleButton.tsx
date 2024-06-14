import { Button } from '@/components/ui/button';
import { UseFieldArrayRemove } from 'react-hook-form';
import useCreatePlanStore from '../../store/usePlanEditorStore';

export default function CancelScheduleButton({
  curIndex,
  removeSchedule,
}: {
  curIndex: number;
  removeSchedule: UseFieldArrayRemove;
}) {
  const {
    setIsRegistration,
    setIsEditing,
    setEditingScheduleIndex,
    isEditing,
  } = useCreatePlanStore();

  const handleRemoveSchedule = () => {
    if (isEditing) {
      setEditingScheduleIndex(null);
      setIsEditing(false);
      return;
    }
    removeSchedule(curIndex);
    setIsRegistration(false);
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleRemoveSchedule}
      className="w-[120px]"
    >
      취소
    </Button>
  );
}
