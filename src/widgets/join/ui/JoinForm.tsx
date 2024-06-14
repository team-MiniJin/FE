'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo, Button, Input, submitForm } from '@/shared';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleError = useCallback((name: string, error: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isFormValid, newErrors } = submitForm(formValues, errors);
    if (!isFormValid) {
      setErrors(newErrors);
      return;
    }
    const { confirmPassword, ...userData } = formValues;
    setIsSubmitted(true);
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
    <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
          <h2 className="font-bold">회원가입</h2>
          <Input
            name="name"
            placeholder="이름"
            value={formValues.name}
            onChange={handleChange}
            onError={handleError}
          />
          <Input
            name="email"
            placeholder="이메일"
            value={formValues.email}
            onChange={handleChange}
            onError={handleError}
          />
          <Input
            name="username"
            placeholder="아이디"
            value={formValues.username}
            onChange={handleChange}
            onError={handleError}
          />
          <Input
            name="password"
            placeholder="비밀번호"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            onError={handleError}
          />
          <Input
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            onError={handleError}
            confirmPassword={formValues.password}
          />
          <Button text="가입하기" />
        </form>
      </div>
    </div>
  );
}
