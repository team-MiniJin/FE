import { AiOutlinePlus } from 'react-icons/ai';

export default function AddPlanDateButton({ addDay }: { addDay: () => void }) {
  return (
    <button
      onClick={addDay}
      type="button"
      className="flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-slate-100"
      aria-label="date card"
    >
      <span className="text-lg">
        <AiOutlinePlus />
      </span>
      <span>날짜 추가</span>
    </button>
  );
}
