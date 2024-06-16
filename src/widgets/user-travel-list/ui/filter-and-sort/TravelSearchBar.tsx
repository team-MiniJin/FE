'use client';

import { SearchBar } from '@/shared';
import useTravelFilterAndSortStore from '../../store/useTravelFilterAndSortStore';

export default function TravelSearchBar() {
  const { search, setSearch } = useTravelFilterAndSortStore();

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div>
      <SearchBar
        properties={{
          value: search,
          onChange: handleSearchChange,
        }}
      />
    </div>
  );
}
