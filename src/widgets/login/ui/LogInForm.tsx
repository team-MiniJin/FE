'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher, useAuth, TRAVEL_URL } from '@/shared';

const formSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]{6,20}$/, {
    message: '6~20자의 영문, 숫자만 가능합니다.',
  }),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
      message: '8~20자의 영문, 숫자, 특수문자 조합이어야 합니다.',
    }),
});

export default function LogInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { setJwt } = useAuth();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetcher(
        TRAVEL_URL,
        '/auth/login',
        'post',
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        undefined,
        values
      );
      console.log('응답', response);
      const jwt = response && response.headers.authorization.split(' ');
      if (jwt) {
        localStorage.setItem('jwt', jwt);
        setJwt(jwt);
        router.push('/');
      } else {
        console.error('JWT not found in the response headers');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    router.push(`${TRAVEL_URL}/oauth2/authorization/kakao`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl"
      >
        <div className="font-bold">로그인</div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="아이디" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 ml-2 bg-transparent text-slate-500 hover:bg-transparent hover:opacity-50"
            tabIndex={-1}
          >
            {showPassword ? '숨기기' : '표시'}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">또는</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <Button
          type="button"
          className="w-full hover:opacity-50"
          style={{
            backgroundImage: "url('/image/kakao_login_large_wide.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleKakaoLogin}
        />
        <div className="flex justify-between text-sm">
          <Link href="/find-username" className="hover:text-[#3666FF]">
            아이디 찾기
          </Link>
          <Link href="/find-password" className="hover:text-[#3666FF]">
            비밀번호 찾기
          </Link>
        </div>
      </form>
    </Form>
  );
}
