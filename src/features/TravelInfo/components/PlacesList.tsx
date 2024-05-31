import Link from 'next/link';
import React from 'react';

const places = [
  { id: 1, name: '장소명1', description: '설명1' },
  { id: 2, name: '장소명2', description: '설명2' },
  { id: 3, name: '장소명3', description: '설명3' },
  { id: 4, name: '장소명4', description: '설명4' },
];

export default function PlacesList() {
  return (
    <div className="space-y-4">
      {places.map((place) => (
        <Link
          key={place.id}
          href="/place-info"
          className="flex h-52 w-full border-t border-gray-200"
        >
          <div className="m-4 h-44 w-44 bg-gray-300" />
          <div className="m-4 flex flex-col">
            <div className="text-xl font-bold">{place.name}</div>
            <div className="text-lg font-normal">{place.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
