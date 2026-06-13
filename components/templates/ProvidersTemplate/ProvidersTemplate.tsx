'use client';

import { useState } from 'react';
import ProviderData from '@/components/sections/providers/ProviderData';
import Sidebar from '@/components/sections/providers/Sidebar';
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import type { FiltersState } from '@/components/sections/providers/Sidebar';

const ProvidersTemplate = () => {
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: [],
    priceMin: 0,
    priceMax: Infinity,
    rating: null,
  });

  return (
    <div>
      <HeaderSection title="Providers" />
      <div className="flex flex-col gap-6 px-5 pb-16 lg:flex-row 2xl:w-350 xl:w-310 lg:w-260 w-full m-auto lg:pt-8">
        <Sidebar filters={filters} setFilters={setFilters} />
        <ProviderData filters={filters} />
      </div>
    </div>
  );
};

export default ProvidersTemplate;
