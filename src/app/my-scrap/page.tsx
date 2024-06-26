import { ScrapList } from '@/widgets';

export default function MyScrap() {
  return (
    <div className="mt-[16px]">
      <h2 className="font-bold">내가 스트랩한 일정</h2>
      <div className="my-4 h-[1px] w-full border-b" />
      <ScrapList />
    </div>
  );
}
