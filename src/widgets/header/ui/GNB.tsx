'use client';

import { GNB_CATEGORIES } from '@/widgets/header/constants/gnb';
import { useState } from 'react';
import GNBCategory from './GNBCategory';

export default function GNB() {
  const [activedCategory, setActivedCatogory] = useState<string>('');
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
