'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {
  Search,
  MessageSquare,
  MapPin,
  CalendarDays,
  Pencil,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from '@/state/services/user/RequestService';
import { IReview } from '@/types/Review';
import toast, { Toaster } from 'react-hot-toast';

interface IMyReview {
  _id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  image: string;
  createdAt: string;
  service: string;
}

const MyReviews = () => {
  const [search, setSearch] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editHoveredRating, setEditHoveredRating] = useState(0);
  const [editText, setEditText] = useState('');
  const [saving, setSaving] = useState(false);

  const { data: myReviews = [], isLoading: reviewLoading } =
    useGetReviewsQuery();

  const [updateReview] = useUpdateReviewMutation();

  console.log('my review', myReviews);
  console.log('set review data', editingReview);

  const [reviews, setReviews] = useState<IMyReview[]>([
    {
      _id: '1',
      name: 'Sarah Ahmed',
      location: 'Dhaka, Bangladesh',
      review:
        'Excellent service! The provider was very professional and completed the work ahead of schedule. Highly recommended for anyone looking for quality work.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=1',
      createdAt: '2026-05-28T10:30:00Z',
      service: 'Plumbing Repair',
    },
    {
      _id: '2',
      name: 'Rafiq Hasan',
      location: 'Chittagong, Bangladesh',
      review:
        'Good work overall. There were some minor delays but the quality was satisfactory. Would consider hiring again.',
      rating: 4,
      image: 'https://i.pravatar.cc/150?img=2',
      createdAt: '2026-05-25T14:20:00Z',
      service: 'Electrical Wiring',
    },
    {
      _id: '3',
      name: 'Fatima Begum',
      location: 'Sylhet, Bangladesh',
      review:
        'Average experience. The work was okay but communication could have been better. Not completely satisfied.',
      rating: 3,
      image: 'https://i.pravatar.cc/150?img=3',
      createdAt: '2026-05-20T09:15:00Z',
      service: 'AC Servicing',
    },
    {
      _id: '4',
      name: 'Kabir Hossain',
      location: 'Dhaka, Bangladesh',
      review:
        "Terrible experience. The provider didn't show up on time and the work was incomplete. Would not recommend.",
      rating: 1,
      image: 'https://i.pravatar.cc/150?img=4',
      createdAt: '2026-05-18T16:45:00Z',
      service: 'Painting',
    },
    {
      _id: '5',
      name: 'Nusrat Jahan',
      location: 'Gazipur, Bangladesh',
      review:
        'Very happy with the service! The attention to detail was impressive and the pricing was fair. Will definitely book again.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=5',
      createdAt: '2026-05-15T11:00:00Z',
      service: 'Deep Cleaning',
    },
    {
      _id: '6',
      name: 'Tariq Islam',
      location: 'Narayanganj, Bangladesh',
      review:
        'Decent service for the price. Nothing extraordinary but got the job done. The provider was polite and professional.',
      rating: 4,
      image: 'https://i.pravatar.cc/150?img=6',
      createdAt: '2026-05-12T08:30:00Z',
      service: 'Furniture Assembly',
    },
  ]);

  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating: number) => (
    <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
  );

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

  const handleEdit = (review: IReview) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditText(review.comment);
    setEditModal(true);
  };

  const handleClose = () => {
    setEditModal(false);
    setEditingReview(null);
    setEditRating(0);
    setEditText('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editRating) return;
    if (!editText.trim()) return;

    setSaving(true);

    try {
      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReview?._id
            ? { ...r, rating: editRating, review: editText }
            : r
        )
      );

      const reviewData = {
        rating: editRating,
        comment: editText,
      };

      const res = await updateReview({
        reviewId: editingReview?._id,
        reviewData,
      }).unwrap();

      if (res.success) {
        toast.success('Review submitted successfully!');
        handleClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">My Reviews</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Reviews you have given to service providers
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          placeholder="Search by provider or service..."
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
              <div className="p-5 pt-0">
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : myReviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              {/* Top Section - Provider Info */}
              <div className="p-5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-100 group-hover:ring-[#E91E63]/20 transition">
                    <Image
                      src={review?.provider?.user?.image}
                      alt={review?.provider?.user?.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {review?.provider?.user?.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="size-3 shrink-0" />
                      <span className="truncate">
                        {review?.provider?.location?.address}
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
                  <span className="text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
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
                    {review.comment}
                  </p>
                </div>

                {/* Edit Button */}
                <Button
                  onClick={() => handleEdit(review)}
                  variant="outline"
                  className="w-full mt-4 h-10 rounded-xl text-sm cursor-pointer"
                >
                  <Pencil className="size-4 mr-2" />
                  Edit Review
                </Button>
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
              : 'Your reviews will appear here after you review a service'}
          </p>
        </div>
      )}

      {/* Edit Review Modal */}
      <Dialog open={editModal} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm rounded-2xl p-0 gap-0 overflow-hidden">
          <form onSubmit={handleSave}>
            <div className="p-5 pb-0">
              <h2 className="text-lg font-semibold">Edit Review</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {editingReview?.provider?.user?.name} &middot;{' '}
                {editingReview?.request?.category?.label}
              </p>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium">Rating</p>
                <div className="flex items-center gap-1">
                  <Rating
                    style={{ maxWidth: 200 }}
                    value={editRating}
                    onChange={setEditRating}
                    onHoverChange={setEditHoveredRating}
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {['', 'Bad', 'Okay', 'Good', 'Great', 'Excellent'][
                      editHoveredRating || editRating
                    ] || 'Select'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-review" className="text-sm font-medium">
                  Review
                </label>
                <Textarea
                  id="edit-review"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Describe your experience..."
                  className="min-h-28 resize-none"
                />
              </div>
            </div>

            <div className="border-t bg-muted/50 p-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={saving}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving || !editRating || !editText.trim()}
                className="cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white"
              >
                {saving && <Loader2 className="size-4 animate-spin mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default MyReviews;
