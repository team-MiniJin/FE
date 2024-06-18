'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared';

export default function LogoutButton() {
  const router = useRouter();
  const { setJwt } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
    alert('로그아웃 되었습니다.');
    router.push('/');
  };

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
