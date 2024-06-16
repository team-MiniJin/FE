'use client';

import { GNB_CATEGORIES } from '@/widgets/header/constants/gnb';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GNBCategory from './GNBCategory';

export default function GNB({ closeNav }: { closeNav: () => void }) {
  const pathname = usePathname();
  const [activedCategory, setActivedCatogory] = useState<string>('');
  useEffect(() => {
    const curCategory = pathname.split('/')[1];
    if (curCategory !== activedCategory) setActivedCatogory(curCategory);
  }, [pathname]);
  return (
    <nav className="absolute right-0 top-[64px] flex flex-col px-6 text-right md:static md:flex-row md:space-x-8 md:px-0">
      {Object.keys(GNB_CATEGORIES).map((categoryKey) => (
        <GNBCategory
          key={categoryKey}
          categoryKey={categoryKey}
          categoryValue={GNB_CATEGORIES[categoryKey]}
          activedCategory={activedCategory}
          setActivedCatogory={setActivedCatogory}
          closeNav={closeNav}
        />
      ))}
    </nav>
  );
}
