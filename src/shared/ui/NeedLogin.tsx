import { Button } from '@/components/ui/button';

export default function NeedLogin() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">로그인이 필요한 페이지입니다.</h2>

      <Button variant="outline">로그인하러 가기</Button>
    </div>
  );
}
