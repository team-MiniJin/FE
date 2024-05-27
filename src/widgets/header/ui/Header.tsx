import GNB from './GNB';
import JoinLink from './JoinLink';
import LoginLink from './LoginLink';
import LogoutButton from './LogoutButton';
import MyPageLink from './MyPageLink';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 ">
      <div className="flex items-center  space-x-8">
        <h1 className="text-2xl font-bold">Travel</h1>
        <GNB />
      </div>
      <div className="text-sm">
        <div className="space-x-4">
          <LoginLink />
          <JoinLink />
        </div>
        <div className="hidden space-x-4">
          <MyPageLink />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
