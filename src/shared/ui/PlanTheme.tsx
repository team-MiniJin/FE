export default function PlanTheme({ theme }: { theme: string }) {
  return (
    <div className="inline-block rounded-md bg-[--brand-main-color] px-3 py-1 text-sm text-white">
      {theme}
    </div>
  );
}
