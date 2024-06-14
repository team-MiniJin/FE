import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Header, ChatPopup } from '@/widgets';
import { Metadata } from 'next';
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
          <div className="relative mx-auto min-h-svh min-w-[360px] max-w-[1024px] overflow-hidden px-8 text-[--text-default-color] disabled:!bg-[--deactived-color] disabled:!text-[--deactived-text-color]">
            <Header />
            <main>{children}</main>
            <ChatPopup />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
