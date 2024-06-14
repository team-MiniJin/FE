import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function EditorPlanCancelButton() {
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
