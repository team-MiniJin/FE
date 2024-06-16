interface SigunguCodeProps {
  code: number;
  name: string;
  isSelected: boolean;
  onClick: (sigunguCode: number, sigunguName: string) => void;
}

export default function SigunguCode({
  code,
  name,
  isSelected,
  onClick,
}: SigunguCodeProps) {
  return (
    <div className="leading-[1.5rem]">
      <button
        type="button"
        onClick={() => onClick(code, name)}
        className={`w-full text-center hover:text-[--brand-color] ${isSelected ? 'font-bold text-[--brand-color]' : ''}`}
      >
        {name}
      </button>
    </div>
  );
}
