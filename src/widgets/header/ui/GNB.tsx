'use client';

import { GNB_CATEGORIES } from '@/widgets/header/constants/gnb';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GNBCategory from './GNBCategory';

export default function GNB({ closeNav }: { closeNav: () => void }) {
  const pathname = usePathname();
  const [activatedCategory, setActivatedCatogory] = useState<string>('');
  useEffect(() => {
    const curCategory =
      pathname.split('/')[1] === '' ? '/' : pathname.split('/')[1];
    if (curCategory !== activatedCategory) setActivatedCatogory(curCategory);
  }, [pathname]);
  return (
    <nav className="absolute right-0 top-[64px] flex flex-col px-6 text-right min-[900px]:static min-[900px]:flex-row min-[900px]:space-x-8 min-[900px]:px-0">
      {Object.keys(GNB_CATEGORIES).map((categoryKey) => (
        <GNBCategory
          key={categoryKey}
          categoryKey={categoryKey}
          categoryValue={GNB_CATEGORIES[categoryKey]}
          activatedCategory={activatedCategory}
          setActivatedCatogory={setActivatedCatogory}
          closeNav={closeNav}
        />
      ))}
    </nav>
  );
}
