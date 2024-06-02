import React from 'react';
import FilterArea from '@/features/TravelInfo/components/FilterArea';
import PlacesList from '@/features/TravelInfo/components/PlacesList';
import Map from '@/features/TravelInfo/components/Map';

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
