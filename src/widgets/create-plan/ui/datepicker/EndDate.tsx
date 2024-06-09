import { UseFormReturn } from 'react-hook-form';
import { ko } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { eachDayOfInterval, format } from 'date-fns';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export default function EndDate({
  form,
  setDateOfDays,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  setDateOfDays: React.Dispatch<React.SetStateAction<Date[]>>;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="flex flex-col">
      <FormField
        control={form.control}
        name="end_date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>도착일</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[150px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? format(new Date(field.value), 'yyyy-MM-dd', {
                          locale: ko,
                        })
                      : '날짜 선택'}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date && date < form.getValues().start_date) return;
                    if (date !== undefined) {
                      field.onChange(format(date, 'yyyy-MM-dd'));
                      form.setValue('end_date', date);
                      const days = eachDayOfInterval({
                        start: form.getValues().start_date,
                        end: date,
                      });
                      setDateOfDays(days);
                    }
                  }}
                  disabled={(date) => date < form.getValues().start_date}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
