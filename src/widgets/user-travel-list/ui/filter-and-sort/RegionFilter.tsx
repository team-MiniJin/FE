'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useTravelFilterAndSortStore from '../../store/useTravelFilterAndSortStore';
import { REGIONS } from '../../constants/user-travel-consts';

export default function RegionFilter() {
  const { region, setRegion } = useTravelFilterAndSortStore();
  return (
    <Select onValueChange={setRegion} value={region as string}>
      <SelectTrigger>
        <SelectValue>{REGIONS[region]}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {Object.keys(REGIONS).map((key) => (
          <SelectItem key={key} id={key} value={REGIONS[key]}>
            {REGIONS[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
