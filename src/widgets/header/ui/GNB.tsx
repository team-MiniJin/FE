'use client';

import { GNB_CATEGORIES } from '@/widgets/header/consts/gnb';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GNBCategory from './GNBCategory';

export default function GNB() {
  const pathname = usePathname();
  const [activedCategory, setActivedCatogory] = useState<string>('');
  useEffect(() => {
    const curCategory = pathname.split('/')[1];
    if (curCategory !== activedCategory) setActivedCatogory(curCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <nav className="space-x-8">
      {Object.keys(GNB_CATEGORIES).map((categoryKey) => (
        <GNBCategory
          key={categoryKey}
          categoryKey={categoryKey}
          categoryValue={GNB_CATEGORIES[categoryKey]}
          activedCategory={activedCategory}
          setActivedCatogory={setActivedCatogory}
        />
      ))}
    </nav>
  );
}
