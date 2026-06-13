'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import providerData from '../../../data/providers.json';
import type { Provider } from '../../../types/Providers';
import { useGetCategoriesQuery } from '@/state/services/public/publicService';

export interface FiltersState {
  search: string;
  category: string[];
  priceMin: number;
  priceMax: number;
  rating: number | null;
}

interface SidebarProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const allCategories = [
  ...new Set(providerData.flatMap((p: Provider) => p.services)),
];

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const Sidebar = ({ filters, setFilters }: SidebarProps) => {
  // mobile response
  const [mobileOpen, setMobileOpen] = useState(false);
  // category data fetch
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  const toggleCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const setRating = (val: number | null) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === val ? null : val,
    }));
  };

  const clearAll = () => {
    setFilters({
      search: '',
      category: [],
      priceMin: 0,
      priceMax: Infinity,
      rating: null,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < Infinity ||
    filters.rating !== null;

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search providers..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: any) => {
            const active = filters.category.includes(cat._id);
            return (
              <button
                key={cat._id}
                onClick={() => toggleCategory(cat._id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.priceMin || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceMin: e.target.value ? Number(e.target.value) : 0,
              }))
            }
            className="h-9 text-sm"
          />
          <span className="text-gray-400">—</span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.priceMax === Infinity ? '' : filters.priceMax || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceMax: e.target.value ? Number(e.target.value) : Infinity,
              }))
            }
            className="h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {RATING_OPTIONS.map((val) => {
            const active = filters.rating === val;
            return (
              <button
                key={val}
                onClick={() => setRating(val)}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                  active
                    ? 'bg-primary-light text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    active ? 'border-primary bg-primary' : 'border-gray-300'
                  }`}
                >
                  {active && (
                    <span className="size-1.5 rounded-full bg-white" />
                  )}
                </span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={i < val ? 'text-[#ddb60a]' : 'text-gray-200'}
                      size={12}
                    />
                  ))}
                  <span className="ml-1">& up</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearAll}
          className="w-full cursor-pointer gap-2"
        >
          <X className="size-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-xs bg-white"
      >
        <SlidersHorizontal className="size-4" />
        Filters
        {hasActiveFilters && (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
            {filters.category.length +
              (filters.rating ? 1 : 0) +
              (filters.priceMin > 0 || filters.priceMax < Infinity ? 1 : 0) +
              (filters.search ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block w-72 shrink-0"
      >
        <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-medium text-primary">
                {filters.category.length +
                  (filters.rating ? 1 : 0) +
                  (filters.priceMin > 0 || filters.priceMax < Infinity
                    ? 1
                    : 0) +
                  (filters.search ? 1 : 0)}{' '}
                active
              </span>
            )}
          </div>
          {filterContent}
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <X className="size-4" />
              </button>
            </div>
            {filterContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
