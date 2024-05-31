import React from 'react';
import FilterArea from '@/features/TravelInfo/components/FilterArea';
import PlacesList from '@/features/TravelInfo/components/PlacesList';
import Map from '@/features/TravelInfo/components/Map';

export default function TravelInfo() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed left-0 top-20 z-10 w-full border-y border-gray-200 bg-white">
        <FilterArea />
      </div>
      <div className="flex w-full pt-16">
        <div className="w-1/2 overflow-auto">
          <PlacesList />
        </div>
        <div className="fixed right-0 top-36 w-1/2">
          <Map />
        </div>
      </div>
    </div>
  );
}
