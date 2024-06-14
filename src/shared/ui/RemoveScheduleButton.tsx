import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AiOutlineDelete } from 'react-icons/ai';

export default function RemoveScheduleButton({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <button
          type="button"
          aria-label="장소 삭제"
          className="rounded-full p-2 hover:bg-slate-100"
        >
          <AiOutlineDelete className="text-xl" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>일정을 삭제할까요?</DialogTitle>
          <DialogDescription>
            삭제된 일정은 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={onClickHandler}>
              삭제
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
