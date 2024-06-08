import { Button } from '@/components/ui/button';

export default function SubmitButton() {
  return (
    <Button
      type="button"
      className="w-full  bg-[--brand-main-color] hover:bg-[--brand-sub-color]"
    >
      만들기
    </Button>
  );
}
