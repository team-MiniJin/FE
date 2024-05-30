import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GoPlus } from 'react-icons/go';

export default function CreatingPlanButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="/creating-plan">
        <GoPlus className="mr-2" />
        일정 만들기
      </Link>
    </Button>
  );
}
