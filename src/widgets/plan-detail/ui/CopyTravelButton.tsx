import { BsCopy } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useEffect } from 'react';
import { useAuth } from '@/shared';
import useCopyPlan from '../model/useCopyPlan';

export default function CopyTravelButton({ planId }: { planId: number }) {
  const { jwt, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { data, mutate, isSuccess, isPending, isError } = useCopyPlan();

  useEffect(() => {
    if (isPending) {
      toast({
        title: '여행 일정 복사가 진행되고 있어요.',
        description: '잠시만 기다려주세요.',
      });
    } else if (isError) {
      toast({
        title: '여행 일정 복사가 실패했어요.',
        description: '잠시 후 다시 시도해 주세요.',
      });
    } else if (isSuccess && data) {
      toast({
        title: '여행 일정 복사가 완료되었어요!',
        description: '지금 복사된 일정을 보러갈 수 있어요.',
        action: (
          <ToastAction
            altText="일정 보러가기"
            onClick={() => router.push(`/my-travels/plan/${data.plan_id}`)}
          >
            보러가기
          </ToastAction>
        ),
      });
    }
  }, [isPending, isError, isSuccess, data, router, toast]);

  if (isAuthLoading || !jwt) return null;

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
