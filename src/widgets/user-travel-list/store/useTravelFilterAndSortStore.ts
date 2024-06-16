import { create } from 'zustand';
import { THEMES } from '@/shared';
import { REGIONS } from '../constants/user-travel-consts';
import { SortType } from '../types/user-travel-type';

interface TravelFilterAndSortStoreT {
  sort: SortType;
  region: keyof typeof REGIONS;
  theme: keyof typeof THEMES;
  search: string;
  setSort: (sort: SortType) => void;
  setRegion: (region: keyof typeof REGIONS) => void;
  setTheme: (theme: keyof typeof THEMES) => void;
  setSearch: (search: string) => void;
}

const initialState: Omit<
  TravelFilterAndSortStoreT,
  'setSort' | 'setRegion' | 'setTheme' | 'setSearch'
> = {
  sort: 'newest',
  region: 'All',
  theme: 'all',
  search: '',
};

const useTravelFilterAndSortStore = create<TravelFilterAndSortStoreT>(
  (set) => ({
    ...initialState,
    setSort: (sort) => set({ sort }),
    setRegion: (region) => set({ region }),
    setTheme: (theme) => set({ theme }),
    setSearch: (search) => set({ search }),
  })
);

export default useTravelFilterAndSortStore;
