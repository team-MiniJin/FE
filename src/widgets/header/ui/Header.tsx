import GNB from './GNB';

export default function Header() {
  return (
    <header className="flex  py-6">
      <div className="flex items-center  space-x-8">
        <h1 className="text-2xl font-bold">Travel</h1>
        <GNB />
      </div>
      <div />
    </header>
  );
}
