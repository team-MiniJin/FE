'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  styleType?: string;
}

function Button({ text, onClick = () => {}, styleType = 'blue' }: ButtonProps) {
  let buttonStyle = 'w-full h-12 rounded-md flex items-center justify-center';

  switch (styleType) {
    case 'blue':
      buttonStyle += ' bg-blue-500 text-white hover:bg-blue-400';
      break;
    case 'kakao':
      buttonStyle += ' bg-yellow-300 text-black hover:bg-yellow-200';
      break;
    default:
      break;
  }

  return (
    <button type="button" className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
