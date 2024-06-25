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
import { useRouter } from 'next/navigation';
import { fetcher, TRAVEL_URL } from '@/shared';

const formSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]{6,20}$/, {
    message: '6~20자의 영문, 숫자만 가능합니다.',
  }),
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

export default function FindPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 요청 중 상태 관리
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetcher(
        TRAVEL_URL,
        '/users/find-password',
        'post',
        {
          'Content-Type': 'application/json',
        },
        undefined,
        values
      );
      console.log('응답', response);

      if (response.data) {
        setSuccessMessage(`${values.email}로 임시 비밀번호를 발송했습니다.`);
        setErrorMessage(null);
      }
    } catch (error: any) {
      console.log('에러', error);
      setErrorMessage(error.message);
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl"
        >
          <div className="font-bold">비밀번호 찾기</div>
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
          <Button
            type="submit"
            className="w-full bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '임시 비밀번호 발급받기'}
          </Button>
          {errorMessage && (
            <div className="mt-4 text-red-500">{errorMessage}</div>
          )}
        </form>
      </Form>
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
          <div className="space-y-4 p-8 text-center">
            <p className="text-lg font-semibold">{successMessage}</p>
            <Button
              className="bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
              onClick={() => router.push('/login')}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
