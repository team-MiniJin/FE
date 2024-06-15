import RegionFilter from './filter-and-sort/RegionFilter';
import ThemeFilter from './filter-and-sort/ThemeFilter';
import TravelSearchBar from './filter-and-sort/TravelSearchBar';
import TravelSort from './filter-and-sort/TravelSort';

export default function UserTravelFilterAndSort() {
  return (
    <div className="flex space-x-4">
      <div className="w-[140px]">
        <TravelSort />
      </div>
      <div className="w-[160px]">
        <RegionFilter />
      </div>
      <div className="w-[140px]">
        <ThemeFilter />
      </div>
      <div className="grow">
        <TravelSearchBar />
      </div>
    </div>
  );
}
