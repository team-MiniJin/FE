'use client';

import clsx from 'clsx';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  styleType?: 'blue' | 'kakao' | 'sky' | 'disabled';
}

export default function Button({
  text,
  onClick = () => {},
  styleType = 'blue',
}: ButtonProps) {
  const buttonStyle = clsx(
    'w-full h-12 rounded-md flex items-center justify-center',
    {
      'bg-[#3666FF] text-white hover:bg-[#3666FF]/70': styleType === 'blue',
      'bg-[#FAE100] text-black hover:bg-[#FAE100]/50': styleType === 'kakao',
      'bg-[#3666FF]/25 text-[#3666FF] hover:bg-[#3666FF]/35':
        styleType === 'sky',
      'bg-[#C1C1C1] text-[#868686]': styleType === 'disabled',
    }
  );

  return (
    <button type="submit" className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
