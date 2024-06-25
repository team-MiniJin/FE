import RegionFilter from './filter-and-sort/RegionFilter';
import ThemeFilter from './filter-and-sort/ThemeFilter';
import TravelSearchBar from './filter-and-sort/TravelSearchBar';
import TravelSort from './filter-and-sort/TravelSort';

export default function UserTravelFilterAndSort() {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex space-x-4 ">
        <div className="grow">
          <TravelSort />
        </div>
        <div className="grow">
          <RegionFilter />
        </div>
        <div className="grow">
          <ThemeFilter />
        </div>
      </div>
      <div className="grow">
        <TravelSearchBar />
      </div>
    </div>
  );
}
