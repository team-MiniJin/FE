export default function FilterArea() {
  return (
    <div className="mx-auto flex h-16 max-w-[calc(1024px-4rem)] items-center">
      <div className="flex space-x-4">
        <div className="text-lg font-bold">관광지</div>
        <div className="text-lg font-normal">문화시설</div>
        <div className="text-lg font-normal">축제/행사</div>
        <div className="text-lg font-normal">편의시설</div>
      </div>
      <div className="ml-auto flex items-center">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          className="w-48 border-b border-gray-400 text-center text-gray-500"
        />
      </div>
    </div>
  );
}
