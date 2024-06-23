import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="cursor-pointer text-2xl font-bold text-black">
      <p className="select-none text-2xl font-bold">KORAVEL</p>
    </Link>
  );
}

export default Logo;
