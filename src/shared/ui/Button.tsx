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
      'bg-[--brand-color] text-white hover:bg-[--brand-color-hover]':
        styleType === 'blue',
      'bg-[--kakao-color] text-black hover:bg-[--kakao-color-hover]':
        styleType === 'kakao',
      'bg-[--brand-color]/25 text-[--brand-color] hover:bg-[--brand-color]/35':
        styleType === 'sky',
      'bg-[--deactived-color] text-[--deactived-text-color]':
        styleType === 'disabled',
    }
  );

  return (
    <button type="submit" className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
