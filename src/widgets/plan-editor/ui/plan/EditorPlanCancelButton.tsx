import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function EditorPlanCancelButton({
  setIsEditMode,
}: {
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const route = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        if (setIsEditMode) {
          setIsEditMode(false);
          return;
        }
        route.back();
      }}
    >
      취소
    </Button>
  );
}
