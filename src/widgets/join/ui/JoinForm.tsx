'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
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

const formSchema = z
  .object({
    nickname: z.string().regex(/^[가-힣a-zA-Z]{2,50}$/, {
      message: '2~50자의 한글, 영문만 가능합니다.',
    }),
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    username: z.string().regex(/^[a-zA-Z0-9]{6,20}$/, {
      message: '6~20자의 영문, 숫자만 가능합니다.',
    }),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,20}$/, {
        message:
          '8~20자의 대문자, 소문자, 숫자, 특수문자(!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~) 조합이어야 합니다.',
      }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,20}$/, {
        message:
          '8~20자의 대문자, 소문자, 숫자, 특수문자(!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~) 조합이어야 합니다.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export default function JoinForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...userInfo } = values;
    try {
      const response = await fetcher(
        TRAVEL_URL,
        '/auth/join',
        'post',
        {
          'Content-Type': 'application/json',
        },
        undefined,
        userInfo
      );
      if (response) {
        if (response.data.success) {
          alert('회원가입에 성공했습니다');
          router.push('/login');
        } else {
          alert(response.data.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl"
      >
        <div className="font-bold">회원가입</div>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="h-12">
              <FormControl>
                <Input placeholder="닉네임" {...field} />
              </FormControl>
              <FormMessage className="h-6" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-12">
              <FormControl>
                <Input placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage className="h-6" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="h-12">
              <FormControl>
                <Input placeholder="아이디" {...field} />
              </FormControl>
              <FormMessage className="h-6" />
            </FormItem>
          )}
        />
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-12">
                <FormControl>
                  <Input
                    placeholder="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="h-6" />
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-12">
                <FormControl>
                  <Input
                    placeholder="비밀번호 확인"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="h-6" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-0 ml-2 bg-transparent text-slate-400 hover:bg-transparent"
            tabIndex={-1}
          >
            {showConfirmPassword ? '숨기기' : '표시'}
          </Button>
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
          >
            가입하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
