export default function FilterArea() {
  const categories = ['관광지', '문화시설', '축제/행사', '편의시설'];

  return (
    <nav className="mx-auto flex h-16 max-w-[calc(1024px-4rem)] items-center">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <div key={category} className="text-lg font-normal">
            {category}
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          className="w-48 border-b border-gray-400 text-center text-gray-500"
        />
      </div>
    </nav>
  );
}
