import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Header } from '@/widgets';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/shared';
import ReactQueryProvider from './ReactQueryProvider';

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '코레블:KORAVEL',
  description: '국내 여행 일정 짜기는 이제 코레블에서!.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-svh">
      <body className={`${notoSansKR.className} min-h-svh`}>
        <ReactQueryProvider>
          <AuthProvider>
            <div className="relative mx-auto min-h-svh min-w-[360px] max-w-[1024px] px-8 text-[--text-default-color] disabled:!bg-[--deactivated-color] disabled:!text-[--deactivated-text-color]">
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
