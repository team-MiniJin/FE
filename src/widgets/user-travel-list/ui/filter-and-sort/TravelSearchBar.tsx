'use client';

import { SearchBar } from '@/shared';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import useTravelFilterAndSortStore from '../../store/useTravelFilterAndSortStore';

export default function TravelSearchBar() {
  const { search, setSearch } = useTravelFilterAndSortStore();
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 300),
    []
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
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
