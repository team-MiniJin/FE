'use client';

import Link from 'next/link';
import React from 'react';

export default function GNBCategory({
  categoryKey,
  categoryValue,
  activedCategory,
  setActivedCatogory,
  closeNav,
}: {
  categoryKey: string;
  categoryValue: string;
  activedCategory: string;
  setActivedCatogory: React.Dispatch<React.SetStateAction<string>>;
  closeNav: () => void;
}) {
  return (
    <Link
      id={categoryKey}
      href={`/${categoryKey}`}
      className={`${activedCategory === categoryKey ? 'text-[--brand-color]' : 'text-[--deactived-color]'} inline-block  px-1 py-3 font-bold hover:text-[--brand-color]`}
      onClick={() => {
        setActivedCatogory(categoryKey);
        closeNav();
      }}
    >
      {categoryValue}
    </Link>
  );
}
