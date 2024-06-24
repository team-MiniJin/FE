import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center space-y-4 bg-[#17171b] py-10 text-center text-xs text-[#fff]">
      <div className="flex justify-center">
        <Link href="https://www.notion.so/lyckabc/Travel-58b9487a9ef7403183104cb77cf38656">
          <Image
            width={24}
            height={24}
            src="/image/icons8-notion-100.svg"
            alt="notion"
          />
        </Link>
      </div>
      <div>
        <p>KORAVEL</p>
        <p>국내 여행을 위한 일정짜기 서비스</p>
      </div>
      <div>
        <p>© 2024. MiniJin team. all rights reserved.</p>
      </div>
    </footer>
  );
}
