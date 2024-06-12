import { IoBookmarkOutline } from 'react-icons/io5';

export default function BookmarkWithCount({ count }: { count: number }) {
  return (
    <div
      className="flex items-center space-x-1"
      aria-label={`스크랩 ${count}명`}
    >
      <IoBookmarkOutline className="text-base" />

      <span>{count}</span>
    </div>
  );
}
