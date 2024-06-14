import { GoHeart } from 'react-icons/go';

export default function LikeWithCount({ count }: { count: number }) {
  return (
    <div
      className="flex items-center space-x-1"
      aria-label={`좋아요 ${count}명`}
    >
      <GoHeart className="text-base" />
      <span>{count}</span>
    </div>
  );
}
