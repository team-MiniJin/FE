import Link from 'next/link';

export default function LoginLink() {
  return (
    <Link href="/login" className="px-1 py-3">
      로그인
    </Link>
  );
}
