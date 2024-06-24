import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Footer, Header } from '@/widgets';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/shared';
import ReactQueryProvider from './ReactQueryProvider';

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Travel Helper',
  description:
    '트레블 헬퍼는 여행 계획을 쉽게 관리할 수 있게 도와주는 서비스입니다.',
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
            <Footer />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
