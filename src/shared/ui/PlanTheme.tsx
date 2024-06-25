import { THEMES } from '../constants/themes';

export default function PlanTheme({ theme }: { theme: string }) {
  return (
    <div className="inline-block min-w-fit rounded-md bg-[--brand-main-color] px-3 py-1 text-sm text-white">
      {THEMES[theme]}
    </div>
  );
}
