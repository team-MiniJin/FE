import { IoIosArrowRoundForward } from 'react-icons/io';

export default function WayPoints({
  waypoints,
  className,
}: {
  waypoints: string[];
  className?: string;
}) {
  return (
    <div className="flex space-x-1">
      {waypoints?.map((region, idx) => (
        <div
          key={idx}
          className={`flex items-center space-x-1 text-base ${className}`}
        >
          <p className="inline-block truncate">{region}</p>
          {idx !== waypoints.length - 1 && (
            <span>
              <IoIosArrowRoundForward />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
