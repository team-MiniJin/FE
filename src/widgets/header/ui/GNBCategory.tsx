'use client';

import Link from 'next/link';
import React from 'react';

export default function GNBCategory({
  categoryKey,
  categoryValue,
  activatedCategory,
  setActivatedCatogory,
  closeNav,
}: {
  categoryKey: string;
  categoryValue: string;
  activatedCategory: string;
  setActivatedCatogory: React.Dispatch<React.SetStateAction<string>>;
  closeNav: () => void;
}) {
  return (
    <Link
      id={categoryKey}
      href={`/${categoryKey}`}
      className={`${activatedCategory === categoryKey ? 'text-[--brand-main-color]' : 'text-[--deactivated-color]'} inline-block  px-1 py-3 font-bold hover:text-[--brand-main-color]`}
      onClick={() => {
        setActivatedCatogory(categoryKey);
        closeNav();
      }}
    >
      {categoryValue}
    </Link>
  );
}
