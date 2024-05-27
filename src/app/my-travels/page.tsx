export default function MyTravels() {
  return (
    <div className="mt-10">
      <div>
        <div>
          <h2 className="text-xl font-bold">다가오는 여행 일정</h2>
        </div>
        <div>캐러셀</div>
      </div>
      <div className="my-10 h-[1px] w-full border-t" />
      <div>
        <h2 className="text-xl font-bold">나의 여행 일정</h2>
      </div>
      <div>무한스크롤 리스트</div>
    </div>
  );
}
