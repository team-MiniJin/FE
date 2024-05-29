'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  styleType?: 'blue' | 'kakao';
}

function Button({ text, onClick, styleType }: ButtonProps) {
  let buttonStyle = 'w-full h-12 rounded-md flex items-center justify-center';

  switch (styleType) {
    case 'blue':
      buttonStyle += ' bg-blue-500 text-white';
      break;
    case 'kakao':
      buttonStyle += ' bg-yellow-300 text-black';
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

Button.defaultProps = {
  onClick: () => {},
  styleType: 'blue',
};

export default Button;
