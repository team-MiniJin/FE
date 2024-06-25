'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { fetcher, TRAVEL_URL } from '@/shared';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,20}$/, {
        message:
          '8~20자의 대문자, 소문자, 숫자, 특수문자(!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~) 조합이어야 합니다.',
      }),
    newPassword: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,20}$/, {
        message:
          '8~20자의 대문자, 소문자, 숫자, 특수문자(!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~) 조합이어야 합니다.',
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: '기존 비밀번호와 동일합니다.',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword'],
  });

export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
      return; // JWT가 없으면 요청을 보내지 않음
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: jwt,
    };
    const request = {
      originalPassword: values.password,
      changePassword: values.newPassword,
    };
    try {
      const response = await fetcher(
        TRAVEL_URL,
        '/users/password',
        'patch',
        headers,
        undefined,
        request
      );
      if (response) {
        console.log('응답', response);
        if (response.data.success) {
          alert('비밀번호가 수정되었습니다.');
          router.push('/my-info');
        }
      }
    } catch (error: any) {
      console.log('에러', error);
      alert(error.message);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl"
      >
        <div className="font-bold">비밀번호 변경하기</div>
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-18">
                <FormControl>
                  <Input
                    placeholder="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    name="비밀번호"
                  />
                </FormControl>
                <FormMessage className="h-12" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 ml-2 bg-transparent text-slate-400 hover:bg-transparent"
            tabIndex={-1}
          >
            {showPassword ? '숨기기' : '표시'}
          </Button>
        </div>
        <div className="relative">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="h-18">
                <FormControl>
                  <Input
                    placeholder="새 비밀번호"
                    type={showNewPassword ? 'text' : 'password'}
                    {...field}
                    name="새 비밀번호"
                  />
                </FormControl>
                <FormMessage className="h-12" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-0 top-0 ml-2 bg-transparent text-slate-400 hover:bg-transparent"
            tabIndex={-1}
          >
            {showNewPassword ? '숨기기' : '표시'}
          </Button>
        </div>
        <div className="relative">
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="h-18">
                <FormControl>
                  <Input
                    placeholder="새 비밀번호 확인"
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    {...field}
                    name="새 비밀번호 확인"
                  />
                </FormControl>
                <FormMessage className="h-12" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            className="absolute right-0 top-0 ml-2 bg-transparent text-slate-400 hover:bg-transparent"
            tabIndex={-1}
          >
            {showConfirmNewPassword ? '숨기기' : '표시'}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full bg-[--brand-main-color] hover:bg-[--brand-sub-color]"
        >
          비밀번호 확인
        </Button>
      </form>
    </Form>
  );
}
