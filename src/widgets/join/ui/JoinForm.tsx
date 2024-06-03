'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo, Input, Button } from '@/shared';
import {
  validateName,
  validateEmail,
  validateUsername,
  validatePassword,
} from '@/widgets/join/utils/validators';

export default function JoinForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const validateField = (
    name: string,
    value: string,
    values: typeof formValues
  ) => {
    switch (name) {
      case 'name':
        return validateName(value) ? '' : '2~50자의 한글, 영문만 가능합니다.';
      case 'email':
        return validateEmail(value) ? '' : '올바른 이메일 형식이 아닙니다.';
      case 'username':
        return validateUsername(value)
          ? ''
          : '6~20자의 영문, 숫자만 가능합니다.';
      case 'password':
        return validatePassword(value)
          ? ''
          : '8~20자의 영문, 숫자, 특수문자 조합이어야 합니다.';
      case 'confirmPassword':
        return value === values.password ? '' : '비밀번호가 일치하지 않습니다.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = {
      ...formValues,
      [name]: value,
    };
    setFormValues(updatedFormValues);
    const fieldError = validateField(name, value, updatedFormValues);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const validateForm = (values: typeof formValues) => {
    return Object.entries(values).reduce(
      (acc, [name, value]) => {
        const error = validateField(name, value, values);
        if (error) acc[name] = error;
        return acc;
      },
      {} as { [key: string]: string }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formValues);
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setIsSubmitted(true);
      const { confirmPassword, ...userData } = formValues;
      console.log('Form Data:', userData);
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        window.alert('회원가입이 완료되었습니다!');
        router.push('/login');
      }, 0);
    }
  }, [isSubmitted, router]);

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
          <h2 className="font-bold">회원가입</h2>
          <Input
            name="name"
            placeholder="이름"
            value={formValues.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            name="email"
            placeholder="이메일"
            value={formValues.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="username"
            placeholder="아이디"
            value={formValues.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            placeholder="비밀번호"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <Button text="가입하기" />
        </form>
      </div>
    </div>
  );
}
