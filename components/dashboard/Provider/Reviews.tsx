'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {
  Search,
  MessageSquare,
  MapPin,
  CalendarDays,
  Star,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useProviderReviewsQuery } from '@/state/services/provider/RequestService';

const Reviews = () => {
  const [search, setSearch] = useState('');

  const { data: reviewsInfo = [], isLoading: reviewLoading } =
    useProviderReviewsQuery();

  const renderStars = (rating: number) => (
    <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
  );

  // const averageRating =
  //   reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <p className="text-sm text-gray-500 mt-1">
              What customers are saying about your services
            </p>
          </div>

          {/* Rating Summary Badge */}
          <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border shadow-sm">
            <div className="flex items-center gap-1.5">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-bold text-gray-900">3.7</span>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">
                {reviewsInfo.length}
              </span>{' '}
              {reviewsInfo.length === 1 ? 'Review' : 'Reviews'}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search by customer or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl border-gray-200 bg-white"
          />
        </div>

        {/* Loading Skeleton */}
        {reviewLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl overflow-hidden"
              >
                <div className="p-5 pb-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
                <div className="border-t" />
                <div className="p-5 pt-3 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : reviewsInfo.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviewsInfo.map((review) => (
              <div
                key={review._id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Top Section - Customer Info */}
                <div className="p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-100 group-hover:ring-pink-500/20 transition">
                      <Image
                        src={review?.user?.image}
                        alt={review?.user?.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {review?.user?.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="size-3 shrink-0" />
                        <span className="truncate">
                          {review?.user?.location?.address}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <CalendarDays className="size-3" />
                      {formatDate(review.createdAt)}
                    </div>
                  </div>

                  {/* Rating + Service */}
                  <div className="flex items-center justify-between mt-3">
                    {renderStars(review.rating)}
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {review?.request?.category?.label}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Review Content */}
                <div className="p-5 pt-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {review?.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MessageSquare className="size-8 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-600">
              {search ? 'No reviews match your search' : 'No reviews yet'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search
                ? 'Try a different search term'
                : 'Reviews from customers will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
