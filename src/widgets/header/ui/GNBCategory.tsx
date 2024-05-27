import Link from 'next/link';
import React from 'react';

export default function GNBCategory({
  categoryKey,
  categoryValue,
  activedCategory,
  setActivedCatogory,
}: {
  categoryKey: string;
  categoryValue: string;
  activedCategory: string;
  setActivedCatogory: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Link
      href={`/${categoryKey}`}
      className={`${activedCategory === categoryKey ? 'text-[--brand-color]' : 'text-[--deactived-color]'} px-1 py-3 text-lg font-bold hover:text-[--brand-color]`}
      onClick={() => setActivedCatogory(categoryKey)}
    >
      {categoryValue}
    </Link>
  );
}
