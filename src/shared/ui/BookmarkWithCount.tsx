import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

export default function BookmarkWithCount({
  count,
  isBookmarked,
}: {
  count: number;
  isBookmarked: boolean;
}) {
  console.log(count, isBookmarked);
  return (
    <div
      className="flex items-center space-x-1"
      aria-label={`스크랩 ${count}명`}
    >
      {isBookmarked ? (
        <IoBookmark className="text-base" />
      ) : (
        <IoBookmarkOutline className="text-base" />
      )}

      <span>{count}</span>
    </div>
  );
}
