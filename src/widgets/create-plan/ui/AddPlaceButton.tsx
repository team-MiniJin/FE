import { Button } from '@/components/ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { UseFieldArrayAppend, UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import useCreatePlanStore from '../store/createPlanStore';

export default function AddPlaceButton({
  appendSchedule,
}: {
  appendSchedule: UseFieldArrayAppend<PlanT, 'schedule'>;
}) {
  const { activedDateCardIndex, setIsRegistration } = useCreatePlanStore();
  const handleAddPlace = () => {
    setIsRegistration(true);
    appendSchedule({
      schedule_day: activedDateCardIndex,
      place_category: '',
      place_name: '',
      place_address: '',
      region: '',
      arrival_time: '',
      budget: [],
      x: 0,
      y: 0,
      place_memo: '',
    });
  };
  return (
    <Button
      type="button"
      variant="outline"
      className="h-[54px] w-full space-x-4"
      onClick={handleAddPlace}
    >
      <span>
        <AiOutlinePlus />
      </span>
      <span>장소 추가</span>
    </Button>
  );
}
