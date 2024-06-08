import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CreatePlanCancelButton() {
  const route = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        route.back();
      }}
    >
      취소
    </Button>
  );
}
