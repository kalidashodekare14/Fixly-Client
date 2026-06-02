'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MapPin, Search } from 'lucide-react';
import { IPublicProvider } from '../../../types/Providers';
import type { FiltersState } from './Sidebar';
import { useProvidersDataQuery } from '@/state/services/public/publicService';

interface ProviderDataProps {
  filters: FiltersState;
}

// -------------------- Provider Card Component -------------------
const ProviderCard = ({
  provider,
  index,
}: {
  provider: IPublicProvider;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition-all hover:shadow-md"
    >
      {/* Online / Offline Badge */}
      <div className="absolute top-1 right-2 z-10">
        {provider.availableStatus ? (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-emerald-600">
              Online
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
            <span className="size-2 rounded-full bg-gray-400" />
            <span className="text-[11px] font-medium text-gray-500">
              Offline
            </span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <div className="relative shrink-0">
          <Image
            className="size-16 rounded-full object-cover ring-2 ring-gray-100"
            src={provider?.user?.image}
            width={64}
            height={64}
            alt={provider?.user?.name}
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-white ${
              provider.availableStatus ? 'bg-emerald-500' : 'bg-gray-400'
            }`}
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[16px] font-bold text-gray-900">
            {provider?.user.name}
          </h3>
          <p className="flex items-center gap-1 text-[13px] text-gray-500">
            <MapPin className="size-3" />
            {provider.location.address}
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="flex flex-wrap gap-2 py-3">
        {provider.services.map((service, i) => (
          <span
            key={i}
            className="rounded-full bg-pastel_pink/60 px-3 py-1 text-[12px] font-medium text-pink/90"
          >
            {service}
          </span>
        ))}
      </div>

      {/* Rating & Jobs */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-sm">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            Rating
          </p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <FaStar className="size-4 text-amber-400" />
            <span className="font-semibold text-gray-900">
              {provider.rating}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            Jobs done
          </p>
          <p className="mt-0.5 font-semibold text-gray-900">
            {provider.experience} yrs
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            Starting from
          </span>
          <p className="text-xl font-bold text-gray-900">
            ${provider.rate}
            <span className="text-sm font-normal text-gray-400">
              /{provider.rateType}
            </span>
          </p>
        </div>
        <button className="cursor-pointer rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-pink/90 hover:shadow-md active:scale-95">
          Hire me
        </button>
      </div>
    </motion.div>
  );
};

const ProviderData = ({ filters }: ProviderDataProps) => {
  // const providers: Provider[] = providerData;
  const { data: providersInfo, isLoading: providerLoading } =
    useProvidersDataQuery({
      search: filters.search,
      category: filters.category.join(','),
      priceMin: filters.priceMin,
      priceMax: filters.priceMax === Infinity ? '' : filters.priceMax,
      rating: filters.rating || '',
    });

  const providersData: IPublicProvider[] = providersInfo?.data || [];

  console.log('Fetched Providers:', providersData);

  // const filteredProviders = useMemo(() => {
  //   return providers.filter((p) => {
  //     const matchSearch =
  //       !filters.search ||
  //       p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
  //       p.services.some((s) =>
  //         s.toLowerCase().includes(filters.search.toLowerCase())
  //       );

  //     const matchCategory =
  //       filters.category.length === 0 ||
  //       p.services.some((s) => filters.category.includes(s));

  //     const matchPrice =
  //       p.price >= filters.priceMin && p.price <= filters.priceMax;

  //     const matchRating = filters.rating === null || p.rating >= filters.rating;

  //     return matchSearch && matchCategory && matchPrice && matchRating;
  //   });
  // }, [providers, filters]);

  return (
    <div className="flex-1">
      {/* Results header */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {providersData.length}
          </span>{' '}
          {providersData.length === 1 ? 'provider' : 'providers'} found
        </p>
      </div>

      {/* Provider Grid */}
      {providersData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {providersData.map((provider, index) => (
            <ProviderCard
              key={provider._id}
              provider={provider}
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20"
        >
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="size-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No providers found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters to see more results.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProviderData;
