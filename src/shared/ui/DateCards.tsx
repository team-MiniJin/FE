'use client';

import { useState, useRef } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function DateCards({
  dates,
  activatedCardIndex,
  disabled,
  onClickHandler,
}: {
  dates: string[];
  activatedCardIndex: number;
  disabled: boolean;
  onClickHandler?: (index: number) => void;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!containerRef.current) return;
    if (e.key === 'ArrowLeft') {
      containerRef.current.scrollLeft -= 100;
    } else if (e.key === 'ArrowRight') {
      containerRef.current.scrollLeft += 100;
    }
  };

  return (
    <div
      ref={containerRef}
      role="listbox"
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
      className="flex cursor-grab space-x-2 overflow-hidden active:cursor-grabbing"
      aria-label="Date cards list"
    >
      {dates.map((date, index) => (
        <div
          key={date}
          role="option"
          aria-selected={activatedCardIndex === index}
          className="shrink-0"
        >
          <button
            onClick={onClickHandler ? () => onClickHandler(index) : undefined}
            type="button"
            className={clsx(
              'flex h-[100px] w-[110px] flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-[--brand-sub-color] hover:text-white disabled:bg-gray-100 disabled:text-[--deactivated-text-color]',
              {
                'hover:tr bg-[--brand-main-color] !text-white disabled:!bg-[--brand-sub-color]':
                  activatedCardIndex === index,
                'space-y-0': pathname.split('/')[1] === 'plan',
              }
            )}
            aria-label={`${date} ${index}일차 날짜 카드 `}
            disabled={disabled}
          >
            <div className="flex items-center font-bold">{index + 1}일차</div>
            {pathname.split('/')[1] !== 'plan' && <div>{date}</div>}
          </button>
        </div>
      ))}
    </div>
  );
}
