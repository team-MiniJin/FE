'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { THEMES } from '@/shared';
import useTravelFilterAndSortStore from '../../store/useTravelFilterAndSortStore';

export default function ThemeFilter() {
  const { theme, setTheme } = useTravelFilterAndSortStore();
  return (
    <Select onValueChange={setTheme} value={theme as string}>
      <SelectTrigger>
        <SelectValue>{THEMES[theme]}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {Object.keys(THEMES).map((key) => (
          <SelectItem key={key} id={key} value={key}>
            {THEMES[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
