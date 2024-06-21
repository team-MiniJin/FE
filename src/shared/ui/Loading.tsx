import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="animate-spin">
        <Image src="/image/loading.png" height={28} width={28} alt="loading" />
      </div>
    </div>
  );
}
