export default function DetailSection() {
  return (
    <>
      <div className="flex h-52 w-full">
        <div className="relative m-4 h-44 w-44 bg-gray-300">
          <div className="absolute left-1 top-1/2 -translate-y-1/2 transform">
            &lt;
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 transform">
            &gt;
          </div>
        </div>
        <div className="m-4 flex flex-col">
          <div className="text-xl font-bold">장소명</div>
          <div className="mt-2">OO도 OO시 OOO로</div>
          <div className="mt-2">000-000-0000</div>
        </div>
      </div>
      <div className="m-4">
        <div className="text-lg font-bold">상세정보</div>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          doloremque minus aperiam libero eos enim esse optio modi mollitia.
          Natus sit temporibus sequi rerum, et cumque facilis maxime aut labore.
        </p>
      </div>
    </>
  );
}
