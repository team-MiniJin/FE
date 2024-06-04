import { Button } from '@/components/ui/button';
import { AiOutlinePlus } from 'react-icons/ai';

export default function AddPlaceButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-[54px] w-full space-x-4"
    >
      <span>
        <AiOutlinePlus />
      </span>
      <span>장소 추가</span>
    </Button>
  );
}
