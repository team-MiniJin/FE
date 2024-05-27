import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Travel Helper",
	description:
		"트레블 헬퍼는 여행 계획을 쉽게 관리할 수 있게 도와주는 서비스입니다.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={notoSansKR.className}>{children}</body>
		</html>
	);
}
