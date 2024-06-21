'use client';

import { useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { z } from 'zod';
import fetcher from '../utils/fetcher';
import { TRAVEL_URL } from '../constants/api';

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
  const [editable, setEditable] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEditInfo = () => {
    setInputValue(value);
    setEditable(true);
  };

  const handleSaveInfo = async () => {
    if (errorMessage) {
      setEditable(false);
      return; // 유효성검사 걸리면 수정 취소
    }
    if (inputValue === value) {
      setEditable(false);
      return; // 같은 값이면 수정 취소
    }
    if (inputValue === null) {
      setInputValue(value);
      setEditable(false);
      return; // 빈값이면 수정 취소
    }

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
      return; // JWT가 없으면 요청을 보내지 않음
    }
    try {
      const param = label === '닉네임' ? 'nickname' : 'email';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: jwt,
      };
      const body = {
        [label === '닉네임' ? 'nickname' : 'email']: inputValue,
      };
      const response = await fetcher(
        TRAVEL_URL,
        `/users/${param}`,
        'patch',
        headers,
        undefined,
        body
      );

      if (response.data.success) {
        console.log('응답', response);
        onSave(inputValue);
        alert(`${label}이 수정되었습니다.`);
      } else {
        console.error('정보 수정에 실패했습니다.');
      }
      setEditable(false);
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const schema =
      label === '닉네임'
        ? z.string().regex(/^[가-힣a-zA-Z]{2,50}$/, {
            message: '2~50자의 한글, 영문만 가능합니다.',
          })
        : z.string().email({ message: '올바른 이메일 형식이 아닙니다.' });
    try {
      schema.parse(newValue);
      setErrorMessage(''); // 유효성 검사 통과 시 에러 메시지 제거
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
        setErrorMessage(error.errors[0].message); // 에러 메시지 표시
      }
    }
  };

  return (
    <div
      className={`my-2 flex ${label ? 'justify-between' : 'justify-center'} items-center`}
    >
      {label && (
        <div className="absolute -left-16 top-3 text-base font-bold">
          {label}
        </div>
      )}
      <div className="relative flex items-center">
        {editable ? (
          <div className="flex flex-col">
            <input
              type="text"
              className={`h-8 w-48 border-b border-gray-400 text-center focus:border-black focus:outline-none ${inputClassName}`}
              value={inputValue}
              onChange={handleChange}
            />
            <div className="h-4">
              {errorMessage && (
                <span className="text-xs text-red-500">{errorMessage}</span>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`h-12 w-48 text-center text-base leading-8 ${displayClassName}`}
          >
            {value}
          </div>
        )}
        <button
          type="button"
          className="absolute -right-8 top-3 ml-2 text-sm text-[#3666FF] hover:text-blue-800"
          onClick={editable ? handleSaveInfo : handleEditInfo}
        >
          {editable ? <FiSave /> : <FiEdit />}
        </button>
      </div>
    </div>
  );
}
