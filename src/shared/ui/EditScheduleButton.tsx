import { Button } from '@/components/ui/button';
import { AiOutlineEdit } from 'react-icons/ai';

export default function EditScheduleButton({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  return (
    <Button
      variant="outline"
      aria-label="장소 수정"
      onClick={onClickHandler}
      className="p-2 hover:bg-slate-100"
    >
      <AiOutlineEdit className="text-xl" />
    </Button>
  );
}
