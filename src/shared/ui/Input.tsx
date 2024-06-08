'use client';

import { useState, useEffect } from 'react';
import { validateField } from '@/shared/utils/validateField';

interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onError?: (name: string, error: string) => void;
  confirmPassword?: string;
}

export default function Input({
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  onError,
  confirmPassword,
}: InputProps) {
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched) {
      const validationError = validateField(name, value || '', confirmPassword);
      if (validationError !== error) {
        setError(validationError);
        if (onError) {
          onError(name, validationError);
        }
      }
    }
  }, [name, value, confirmPassword, isTouched, error, onError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (!isTouched) {
      setIsTouched(true);
    }
  };

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`h-12 w-full rounded-md border px-4 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-red-500">{error}</p>}
    </div>
  );
}
