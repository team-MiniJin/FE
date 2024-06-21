import { BsCopy } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useEffect } from 'react';
import { useAuth } from '@/shared';
import useCopyPlan from '../model/useCopyPlan';

export default function CopyTravelButton({ planId }: { planId: number }) {
  const { jwt, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { data, mutate, isSuccess } = useCopyPlan();

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: '여행 일정 복사가 완료되었어요!',
        description: '지금 복사된 일정을 보러갈 수 있어요.',
        action: (
          <ToastAction
            altText="Goto schedule to undo"
            onClick={() => router.push(`/my-travels/plan/${data.planId}`)}
          >
            보러가기
          </ToastAction>
        ),
      });
    }
  }, [isSuccess, data, router, toast]);

  if (isLoading || !jwt) return null;

  return (
    <Button
      variant="outline"
      onClick={() => {
        mutate(planId);
      }}
    >
      <BsCopy className="text-xl" />
    </Button>
  );
}
