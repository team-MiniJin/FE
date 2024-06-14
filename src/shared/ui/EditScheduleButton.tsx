import { AiOutlineEdit } from 'react-icons/ai';

export default function EditScheduleButton({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="장소 수정"
      onClick={onClickHandler}
      className="rounded-full p-2 hover:bg-slate-100"
    >
      <AiOutlineEdit className="text-xl" />
    </button>
  );
}
