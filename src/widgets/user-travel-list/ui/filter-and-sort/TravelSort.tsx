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
        <SelectValue>{sort}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="최신순">최신순</SelectItem>
        <SelectItem value="스크랩 많은 순">스크랩 많은 순</SelectItem>
      </SelectContent>
    </Select>
  );
}
