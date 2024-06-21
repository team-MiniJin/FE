import { DeleteAccountForm } from '@/widgets';

export default function DeleteAccount() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center space-y-8">
      <DeleteAccountForm />
    </div>
  );
}
