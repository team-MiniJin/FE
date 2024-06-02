import { FilterArea, PlacesList, Map } from '@/widgets';

export default function TravelInfo() {
  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 w-full border-y border-gray-200 bg-white">
        <FilterArea />
      </div>
      <div className="flex w-full">
        <div className="w-1/2">
          <PlacesList />
        </div>
        <div className="fixed left-[50%] top-20 w-[calc(50%-2rem)]">
          <Map />
        </div>
      </div>
    </div>
  );
}
