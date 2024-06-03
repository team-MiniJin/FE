'use client';

import { useState } from 'react';

interface EditableFieldProps {
  label?: string;
  value: string;
  onSave: (value: string) => void;
  inputClassName?: string;
  displayClassName?: string;
}

export default function EditableField({
  label = '',
  value,
  onSave,
  inputClassName = '',
  displayClassName = '',
}: EditableFieldProps) {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEditInfo = () => {
    setEditable(true);
  };

  const handleSaveInfo = () => {
    onSave(inputValue);
    setEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`my-2 flex ${label ? 'justify-between' : 'justify-center'} items-center`}
    >
      {label && <div className="text-base font-bold">{label}</div>}
      <div className="relative flex items-center">
        {editable ? (
          <input
            type="text"
            className={`h-6 w-48 border-b border-gray-400 focus:border-black focus:outline-none ${inputClassName}`}
            value={inputValue}
            onChange={handleChange}
          />
        ) : (
          <div className={`w-48 text-base ${displayClassName}`}>{value}</div>
        )}
        <button
          type="button"
          className="absolute -right-8 ml-2 text-sm text-[#3666FF] hover:text-blue-800"
          onClick={editable ? handleSaveInfo : handleEditInfo}
        >
          {editable ? '저장' : '수정'}
        </button>
      </div>
    </div>
  );
}
