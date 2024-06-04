'use client';

import { eachDayOfInterval, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CiCalendar } from 'react-icons/ci';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createFormSchema } from '@/widgets/create-plan/schema/createFormSchema';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import PlanDateList from './PlanDateList';
import AddPlanDateButton from './AddPlanDateButton';
import AddPlaceButton from './AddPlaceButton';

export default function CreatePlanForm() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [dateOfDays, setDateOfDays] = useState<Date[]>([new Date()]);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      plan_name: '',
      theme: '',
      travel_period: {
        start_date: new Date(),
        end_date: new Date(),
      },
      plan_budget: 0,
      scope: true,
      number_of_members: 0,
      schedule: [],
    },
  });
  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    console.log(values);
  };

  const addDay = () => {
    const endDay = form.getValues().travel_period.end_date;
    if (!endDay) {
      form.setValue('travel_period', {
        end_date: new Date(),
        start_date: new Date(),
      });
      setDateOfDays([new Date()]);
      return;
    }
    const nextDay = new Date(endDay.setDate(endDay.getDate() + 1));

    form.setValue('travel_period', {
      end_date: nextDay,
      start_date: form.getValues().travel_period.start_date,
    });

    const days = eachDayOfInterval({
      start: form.getValues().travel_period.start_date,
      end: nextDay,
    });
    setDateOfDays(days);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="plan_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>여행 일정 이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="여행 일정 이름을 입력해 주세요."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="travel_period"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>여행 기간</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        ' pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value.end_date ? (
                        <>
                          {format(field.value.start_date, 'y년 LL월 dd일', {
                            locale: ko,
                          })}{' '}
                          -{' '}
                          {format(field.value.end_date, 'y년 LL월 dd일', {
                            locale: ko,
                          })}
                        </>
                      ) : (
                        <span className="text-slate-500">
                          여행 기간을 선택해 주세요.
                        </span>
                      )}

                      <CiCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={{
                      from: field.value.start_date,
                      to: field.value.end_date,
                    }}
                    onSelect={(range) => {
                      field.onChange({
                        start_date: range?.from || null,
                        end_date: range?.to || null,
                      });
                      if (range?.from && range?.to) {
                        const days = eachDayOfInterval({
                          start: range.from,
                          end: range.to,
                        });
                        setDateOfDays(days);
                      } else {
                        setDateOfDays([]);
                      }
                    }}
                    numberOfMonths={2}
                    disabled={(Date) => Date < today}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2 overflow-hidden">
          <PlanDateList dateOfDays={dateOfDays} />
          <AddPlanDateButton addDay={addDay} />
        </div>

        <div>
          <div className="border">
            <FormItem>
              <FormControl>
                <Input
                  placeholder="여행 일정 이름을 입력해 주세요."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </div>
          <AddPlaceButton />
        </div>
      </form>
    </Form>
  );
}
