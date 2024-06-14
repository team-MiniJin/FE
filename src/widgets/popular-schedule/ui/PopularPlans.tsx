'use client';

import { useCarousel } from '@/shared';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import usePopularPlan from '../model/usePopularPlan';
import PopularPlan from './PopularPlan';

const BREAK_POINTS: { [key: number]: number } = {
  320: 1,
  768: 2,
  1024: 4,
};
const data = [
  {
    plan_id: 1,
    user_id: 1,
    user_nickname: 'Traveler1',
    plan_name: 'Mountain Adventure',
    theme: 'Mountain',
    start_date: '2024-06-01',
    end_date: '2024-06-07',
    scope: true,
    number_of_members: 4,
    number_of_likes: 1024,
    number_of_scraps: 512,
    plan_budget: 500000,
    waypoints: ['서울', '평창', '속초'],
    schedules: [],
  },
  {
    plan_id: 2,
    user_id: 2,
    user_nickname: 'BeachLover',
    plan_name: 'Summer Beach Trip',
    theme: 'Beach',
    start_date: '2024-07-15',
    end_date: '2024-07-25',
    scope: true,
    number_of_members: 3,
    number_of_likes: 800,
    number_of_scraps: 300,
    plan_budget: 350000,
    waypoints: ['서울', '부산', '제주'],
    schedules: [],
  },
  {
    plan_id: 3,
    user_id: 3,
    user_nickname: 'HistoryBuff',
    plan_name: 'Historical Sites Tour',
    theme: 'History',
    start_date: '2024-08-01',
    end_date: '2024-08-10',
    scope: true,
    number_of_members: 2,
    number_of_likes: 600,
    number_of_scraps: 150,
    plan_budget: 200000,
    waypoints: ['서울', '경주', '안동'],
    schedules: [],
  },
  {
    plan_id: 4,
    user_id: 4,
    user_nickname: 'NatureLover',
    plan_name: 'Nature Escape',
    theme: 'Nature',
    start_date: '2024-09-01',
    end_date: '2024-09-10',
    scope: true,
    number_of_members: 1,
    number_of_likes: 450,
    number_of_scraps: 90,
    plan_budget: 150000,
    waypoints: ['서울', '설악산', '지리산'],
    schedules: [],
  },
  {
    plan_id: 5,
    user_id: 5,
    user_nickname: 'CityExplorer',
    plan_name: 'City Tour',
    theme: 'City',
    start_date: '2024-10-05',
    end_date: '2024-10-15',
    scope: true,
    number_of_members: 5,
    number_of_likes: 950,
    number_of_scraps: 275,
    plan_budget: 400000,
    waypoints: ['서울', '대전', '광주'],
    schedules: [],
  },
  {
    plan_id: 6,
    user_id: 6,
    user_nickname: 'Foodie',
    plan_name: 'Gourmet Tour',
    theme: 'Food',
    start_date: '2024-11-01',
    end_date: '2024-11-10',
    scope: true,
    number_of_members: 3,
    number_of_likes: 1200,
    number_of_scraps: 600,
    plan_budget: 300000,
    waypoints: ['서울', '전주', '부산'],
    schedules: [],
  },
  {
    plan_id: 7,
    user_id: 7,
    user_nickname: 'CultureSeeker',
    plan_name: 'Cultural Journey',
    theme: 'Culture',
    start_date: '2024-12-01',
    end_date: '2024-12-15',
    scope: true,
    number_of_members: 4,
    number_of_likes: 700,
    number_of_scraps: 200,
    plan_budget: 250000,
    waypoints: ['서울', '광주', '제주'],
    schedules: [],
  },
  {
    plan_id: 8,
    user_id: 8,
    user_nickname: 'AdventureFan',
    plan_name: 'Adventure Trip',
    theme: 'Adventure',
    start_date: '2024-05-01',
    end_date: '2024-05-10',
    scope: true,
    number_of_members: 2,
    number_of_likes: 1100,
    number_of_scraps: 330,
    plan_budget: 280000,
    waypoints: ['서울', '속초', '울릉도'],
    schedules: [],
  },
  {
    plan_id: 9,
    user_id: 9,
    user_nickname: 'RelaxationGuru',
    plan_name: 'Relaxation Vacation',
    theme: 'Relaxation',
    start_date: '2024-06-15',
    end_date: '2024-06-25',
    scope: true,
    number_of_members: 3,
    number_of_likes: 500,
    number_of_scraps: 120,
    plan_budget: 220000,
    waypoints: ['서울', '강릉', '남해'],
    schedules: [],
  },
  {
    plan_id: 10,
    user_id: 10,
    user_nickname: 'FamilyTraveler',
    plan_name: 'Family Trip',
    theme: 'Family',
    start_date: '2024-07-01',
    end_date: '2024-07-10',
    scope: true,
    number_of_members: 5,
    number_of_likes: 1300,
    number_of_scraps: 450,
    plan_budget: 500000,
    waypoints: ['서울', '대구', '부산'],
    schedules: [],
  },
  {
    plan_id: 11,
    user_id: 11,
    user_nickname: 'SoloWanderer',
    plan_name: 'Solo Adventure',
    theme: 'Solo',
    start_date: '2024-08-15',
    end_date: '2024-08-25',
    scope: true,
    number_of_members: 1,
    number_of_likes: 300,
    number_of_scraps: 50,
    plan_budget: 100000,
    waypoints: ['서울', '속초', '울산'],
    schedules: [],
  },
  {
    plan_id: 12,
    user_id: 12,
    user_nickname: 'Photographer',
    plan_name: 'Photography Trip',
    theme: 'Photography',
    start_date: '2024-09-10',
    end_date: '2024-09-20',
    scope: true,
    number_of_members: 2,
    number_of_likes: 850,
    number_of_scraps: 270,
    plan_budget: 300000,
    waypoints: ['서울', '남해', '제주'],
    schedules: [],
  },
  {
    plan_id: 13,
    user_id: 13,
    user_nickname: 'ArtLover',
    plan_name: 'Art and Museums',
    theme: 'Art',
    start_date: '2024-10-15',
    end_date: '2024-10-25',
    scope: true,
    number_of_members: 2,
    number_of_likes: 750,
    number_of_scraps: 230,
    plan_budget: 220000,
    waypoints: ['서울', '부산', '광주'],
    schedules: [],
  },
  {
    plan_id: 14,
    user_id: 14,
    user_nickname: 'Hiker',
    plan_name: 'Hiking Trails',
    theme: 'Hiking',
    start_date: '2024-11-20',
    end_date: '2024-11-30',
    scope: true,
    number_of_members: 4,
    number_of_likes: 920,
    number_of_scraps: 360,
    plan_budget: 280000,
    waypoints: ['서울', '지리산', '설악산'],
    schedules: [],
  },
  {
    plan_id: 15,
    user_id: 15,
    user_nickname: 'BeachBum',
    plan_name: 'Beach Relaxation',
    theme: 'Beach',
    start_date: '2024-06-01',
    end_date: '2024-06-10',
    scope: true,
    number_of_members: 3,
    number_of_likes: 839,
    number_of_scraps: 271,
    plan_budget: 262500,
    waypoints: ['서울', '강릉', '동해'],
    schedules: [],
  },
  {
    plan_id: 16,
    user_id: 16,
    user_nickname: 'AdventureSeeker',
    plan_name: 'Thrilling Adventures',
    theme: 'Adventure',
    start_date: '2024-07-05',
    end_date: '2024-07-15',
    scope: true,
    number_of_members: 4,
    number_of_likes: 1100,
    number_of_scraps: 350,
    plan_budget: 300000,
    waypoints: ['서울', '속초', '부산'],
    schedules: [],
  },
];

export default function PopularPlans() {
  //  const { data, isFetching, isLoading } = usePopularPlan();
  const { carouselStartIndex, visibleSlides, nextItem, prevItem } = useCarousel(
    BREAK_POINTS,
    data ? data.length : 0,
    false,
    0
  );
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">금주 인기 여행 일정</h2>
      </div>
      <div className="relative flex w-full justify-center overflow-hidden px-8 py-4">
        {data && (
          <ul className=" flex w-full justify-between overflow-hidden">
            <button
              type="button"
              className="absolute left-0 top-2/4 z-10 -translate-y-2/4  text-4xl disabled:hidden"
              aria-label="이전 슬라이드"
              onClick={prevItem}
              disabled={carouselStartIndex === 0}
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
            {data?.map((plan) => (
              <PopularPlan
                key={plan.plan_id}
                plan={plan}
                carouselStartIndex={carouselStartIndex}
                visibleSlides={visibleSlides}
              />
            ))}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl disabled:hidden"
              type="button"
              aria-label="다음 슬라이드"
              onClick={nextItem}
              disabled={
                carouselStartIndex >= (data?.length ?? 0) - visibleSlides
              }
            >
              <MdOutlineKeyboardArrowRight />
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}
