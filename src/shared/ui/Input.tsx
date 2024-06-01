import React from 'react';

interface InputProps {
  placeholder: string;
  type?: string;
}

function Input({ placeholder, type }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-md border border-gray-300 px-4 py-2"
    />
  );
}

Input.defaultProps = {
  type: 'text',
};

export default Input;
