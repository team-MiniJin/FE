import { Button } from '@/components/ui/button';
import { UseFieldArrayRemove } from 'react-hook-form';
import useCreatePlanStore from '../../store/usePlanEditorStore';

export default function CancelScheduleButton({
  lastIndex,
  removeSchedule,
}: {
  lastIndex: number;
  removeSchedule: UseFieldArrayRemove;
}) {
  const { setIsRegistration, setIsEditing, setEditingScheduleId, isEditing } =
    useCreatePlanStore();

  const handleRemoveSchedule = () => {
    if (isEditing) {
      setEditingScheduleId('');
      setIsEditing(false);
      return;
    }
    removeSchedule(lastIndex);
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
