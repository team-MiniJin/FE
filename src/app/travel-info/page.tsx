'use client';

import { useState } from 'react';
import { FilterArea, PlacesList, Map } from '@/widgets';
import { PlaceT } from '@/widgets/travel-info/types/Place';

export default function TravelInfo() {
  const ENCODING_KEY =
    'NGVffsMvyiv72RIfJIaWX8uyRc%2FREwo2VnS3vrzTPvmub0BAAomblyPiOekyEE6%2FS9eSn%2BOK2P2CWaFStEfr7A%3D%3D';
  const [keyword, setKeyword] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [apiData, setApiData] = useState<PlaceT[] | null>([]);

  const handleCategorySelect = (contentTypeId: number) => {
    setSelectedCategoryId(contentTypeId);
  };

  const handleSearch = async (searchKeyword: string) => {
    setKeyword(searchKeyword);

    try {
      const isSelected = selectedCategoryId
        ? `&contentTypeId=${selectedCategoryId}`
        : '';
      const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=APPTest&serviceKey=${ENCODING_KEY}&_type=json&listYN=Y&arrange=O${isSelected}&keyword=${searchKeyword}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setApiData(data.response.body.items.item);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 w-full border-y border-gray-200 bg-white">
        <FilterArea
          keyword={keyword}
          setKeyword={setKeyword}
          onCategorySelect={handleCategorySelect}
          selectedCategoryId={selectedCategoryId}
          onSearch={handleSearch}
        />
      </div>
      <div className="flex h-full w-full">
        <div className="w-1/2 overflow-y-auto">
          <PlacesList apiData={apiData} />
        </div>
        <div className="fixed right-0 top-20 h-[calc(100%-5rem)] w-1/2 overflow-y-auto">
          <Map />
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { FilterArea, PlacesList, Map } from '@/widgets';
// import { PlaceT } from '@/widgets/travel-info/types/Place';

// export default function TravelInfo() {
//   const ENCODING_KEY =
//     'NGVffsMvyiv72RIfJIaWX8uyRc%2FREwo2VnS3vrzTPvmub0BAAomblyPiOekyEE6%2FS9eSn%2BOK2P2CWaFStEfr7A%3D%3D';
//   const [keyword, setKeyword] = useState('');
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     null
//   );
//   const [apiData, setApiData] = useState<PlaceT[] | null>([]);

//   const handleCategorySelect = (contentTypeId: number) => {
//     setSelectedCategoryId(contentTypeId);
//   };

//   const handleSearch = async (searchKeyword: string) => {
//     setKeyword(searchKeyword);

//     try {
//       const isSelected = selectedCategoryId
//         ? `&contentTypeId=${selectedCategoryId}`
//         : '';
//       const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=APPTest&serviceKey=${ENCODING_KEY}&_type=json&listYN=Y&arrange=O${isSelected}&keyword=${searchKeyword}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
//       const data = await response.json();
//       setApiData(data.response.body.items.item);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className="relative h-full w-full">
//       <div className="sticky top-10 z-10 w-full border-y border-gray-200 bg-white">
//         <FilterArea
//           keyword={keyword}
//           setKeyword={setKeyword}
//           onCategorySelect={handleCategorySelect}
//           selectedCategoryId={selectedCategoryId}
//           onSearch={handleSearch}
//         />
//       </div>
//       <div className="flex w-full">
//         <div className="w-1/2">
//           <PlacesList apiData={apiData} />
//         </div>
//         <div className="fixed left-[50%] top-20 w-[calc(50%-2rem)]">
//           <Map />
//         </div>
//       </div>
//     </div>
//   );
// }
