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
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

export default function FindUsernameForm() {
  const [username, setUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUsername('id1234');
    // setErrorMessage('일치하는 회원정보가 없습니다.');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl"
      >
        <div className="font-bold">아이디 찾기</div>
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
        >
          아이디 확인
        </Button>
        {username && (
          <div className="mt-4">
            회원님의 아이디는{' '}
            <strong className="font-semibold text-[--brand-color]">
              {username}
            </strong>{' '}
            입니다.
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
        <div className="text-sm">
          <Link href="/login" className="hover:text-[#3666FF]">
            로그인 하러 가기
          </Link>
        </div>
      </form>
    </Form>
  );
}
