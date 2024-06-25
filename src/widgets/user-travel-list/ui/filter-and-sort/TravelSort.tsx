'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useTravelFilterAndSortStore from '../../store/useTravelFilterAndSortStore';

export default function TravelSort() {
  const { sort, setSort } = useTravelFilterAndSortStore();
  return (
    <Select onValueChange={setSort} value={sort}>
      <SelectTrigger>
        <SelectValue>
          {sort === 'newest' ? '최신순' : '스크랩 많은 순'}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="newest">최신순</SelectItem>
        <SelectItem value="scraps">스크랩 많은 순</SelectItem>
      </SelectContent>
    </Select>
  );
}
