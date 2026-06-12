'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Star,
  MessageSquareText,
  Search,
  CalendarDays,
  User,
  Trash2,
  Eye,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useManageReviewsQuery } from '@/state/services/admin/AdminService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ratingFilters = ['all', '5', '4', '3', '2', '1'] as const;

const ratingLabel: Record<string, string> = {
  all: 'All',
  '5': '5 Star',
  '4': '4 Star',
  '3': '3 Star',
  '2': '2 Star',
  '1': '1 Star',
};

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'size-3.5',
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
};

const AdminReviews = () => {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, ratingFilter]);

  const { data: reviews, isLoading } = useManageReviewsQuery({
    search,
    rating: ratingFilter,
    currentPage,
  });

  const list = reviews?.data || [];
  const totalPages = reviews?.pagination?.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const viewDetails = (review: any) => {
    setSelectedReview(review);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor and manage all user reviews across the platform.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {!isLoading
              ? [
                  {
                    label: 'Total Reviews',
                    value: reviews?.kpiInfo?.totalReviews || 0,
                    color: 'text-gray-900',
                    bg: 'bg-gray-50',
                    icon: <MessageSquareText className="size-4 text-gray-500" />,
                  },
                  {
                    label: 'Average Rating',
                    value: reviews?.kpiInfo?.averageRating
                      ? Number(reviews.kpiInfo.averageRating).toFixed(1)
                      : '0.0',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    icon: <Star className="size-4 text-amber-500 fill-amber-500" />,
                  },
                  {
                    label: '5 Star',
                    value: reviews?.kpiInfo?.fiveStarCount || 0,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                    icon: <Star className="size-4 text-emerald-500 fill-emerald-500" />,
                  },
                  {
                    label: 'This Month',
                    value: reviews?.kpiInfo?.thisMonthCount || 0,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                    icon: <CalendarDays className="size-4 text-blue-500" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5',
                      stat.bg
                    )}
                  >
                    <span className="text-sm">{stat.icon}</span>
                    <div>
                      <p
                        className={cn('text-lg font-bold leading-none', stat.color)}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-gray-50"
                  >
                    <Skeleton className="size-4 bg-gray-200" />
                    <div>
                      <Skeleton className="h-5 w-12 bg-gray-200 mb-1" />
                      <Skeleton className="h-3 w-16 bg-gray-200" />
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by user, provider or review content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg w-fit">
              {ratingFilters.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setRatingFilter(rating)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap',
                    ratingFilter === rating
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {ratingLabel[rating]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-44 bg-gray-200" />
                    <Skeleton className="h-3 w-60 bg-gray-200" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && list.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-xs border border-gray-100/50 text-center">
            <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <MessageSquareText className="size-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">
              {search || ratingFilter !== 'all'
                ? 'No reviews match your filters'
                : 'No reviews yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {search || ratingFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Reviews will appear here once users submit them'}
            </p>
          </div>
        )}

        {/* Reviews Table (Desktop) */}
        {!isLoading && list.length > 0 && (
          <div className="hidden md:block bg-white rounded-2xl shadow-xs border border-gray-100/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                    <th className="px-4 py-3.5 font-medium w-[20%]">User</th>
                    <th className="px-4 py-3.5 font-medium w-[18%]">Provider</th>
                    <th className="px-4 py-3.5 font-medium w-[14%]">Service</th>
                    <th className="px-4 py-3.5 font-medium w-[10%]">Rating</th>
                    <th className="px-4 py-3.5 font-medium w-[22%]">Review</th>
                    <th className="px-4 py-3.5 font-medium w-[10%]">Date</th>
                    <th className="px-4 py-3.5 font-medium w-[6%]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((review: any) => (
                    <tr
                      key={review._id}
                      className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                            {review?.user?.image ? (
                              <Image
                                src={review.user.image}
                                alt={review?.user?.name || 'User'}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="size-full flex items-center justify-center bg-gray-200">
                                <User className="size-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-gray-900 text-sm truncate min-w-0">
                            {review?.user?.name || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                            {review?.provider?.user?.image ? (
                              <Image
                                src={review.provider.user.image}
                                alt={review?.provider?.user?.name || 'Provider'}
                                fill
                                className="object-cover"
                                sizes="36px"
                              />
                            ) : (
                              <div className="size-full flex items-center justify-center bg-gray-200">
                                <User className="size-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="text-gray-600 text-sm truncate min-w-0">
                            {review?.provider?.user?.name || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge
                          variant="outline"
                          className="text-xs font-normal text-gray-600 bg-gray-50 border-0 rounded-full px-3 truncate max-w-full"
                        >
                          {review?.request?.category?.label || '—'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-gray-600 text-sm truncate min-w-0">
                          {review.comment || '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <CalendarDays className="size-3.5 text-gray-400 shrink-0" />
                          <span className="truncate min-w-0">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => viewDetails(review)}
                          className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                          title="View details"
                        >
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination className="py-3 border-t border-gray-100">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}

        {/* Reviews Cards (Mobile) */}
        {!isLoading && list.length > 0 && (
          <div className="md:hidden space-y-3">
            {list.map((review: any) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="size-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    {review?.user?.image ? (
                      <Image
                        src={review.user.image}
                        alt={review?.user?.name || 'User'}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center bg-gray-200">
                        <User className="size-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {review?.user?.name || 'Anonymous'}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {renderStars(review.rating)}
                      <span className="text-xs text-gray-400">({review.rating})</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="mt-1.5 text-xs font-normal text-gray-600 bg-gray-50 border-0 rounded-full"
                    >
                      {review?.request?.category?.label || '—'}
                    </Badge>
                  </div>
                  <button
                    onClick={() => viewDetails(review)}
                    className="text-gray-400 hover:text-gray-600 transition cursor-pointer shrink-0"
                    title="View details"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {review.comment || 'No comment'}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-sm">
                  <div>
                    <p className="text-[11px] text-gray-400">Provider</p>
                    <p className="text-gray-700 truncate">
                      {review?.provider?.user?.name || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Date</p>
                    <p className="text-gray-600">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <Pagination className="py-3">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Full review information and comments.
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-5">
              {/* User Info */}
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium">Reviewed By</p>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    {selectedReview?.user?.image ? (
                      <Image
                        src={selectedReview.user.image}
                        alt={selectedReview?.user?.name || 'User'}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center bg-gray-200">
                        <User className="size-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedReview?.user?.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedReview?.user?.email || ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium">Provider</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    {selectedReview?.provider?.user?.image ? (
                      <Image
                        src={selectedReview.provider.user.image}
                        alt={selectedReview?.provider?.user?.name || 'Provider'}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center bg-gray-200">
                        <User className="size-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedReview?.provider?.user?.name || 'Unknown Provider'}
                    </p>
                    {selectedReview?.provider?.location?.address && (
                      <p className="text-xs text-gray-500">
                        {selectedReview.provider.location.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service */}
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Service Category</p>
                <Badge
                  variant="outline"
                  className="text-xs font-normal text-gray-600 bg-gray-50 border-0 rounded-full px-3 py-1"
                >
                  {selectedReview?.request?.category?.label || '—'}
                </Badge>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Rating</p>
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm font-medium text-gray-700">
                    ({selectedReview.rating}/5)
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Review Comment</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedReview.comment || 'No comment provided'}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarDays className="size-3.5" />
                Submitted on {formatDate(selectedReview.createdAt)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviews;
