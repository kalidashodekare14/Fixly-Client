'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useGiveReviewMutation } from '@/state/services/user/RequestService';

interface IDrawerProps {
  selectedRequestIdForReview: string;
  reviewDrawer: boolean;
  setReviewDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const GiveReviewModal = ({
  reviewDrawer,
  setReviewDrawer,
  selectedRequestIdForReview,
}: IDrawerProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const [giveReview] = useGiveReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setLoading(true);

    try {
      // Connect review submission API
      console.log({
        requestId: selectedRequestIdForReview,
        rating,
        comment: reviewText,
      });

      const reviewData = {
        requestId: selectedRequestIdForReview,
        rating,
        comment: reviewText,
      };

      const res = await giveReview(reviewData).unwrap();
      if (res?.success) {
        toast.success('Review submitted successfully!');
        setRating(0);
        setReviewText('');
        setReviewDrawer(false);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setReviewText('');
    setReviewDrawer(false);
  };

  return (
    <Dialog open={reviewDrawer} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 gap-0 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-5 pb-0">
            <h2 className="text-lg font-semibold">Give Your Review</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Share your experience with this service provider
            </p>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Star Rating */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Rating</p>
              <div className="flex items-center gap-1">
                <Rating
                  style={{ maxWidth: 200 }}
                  value={rating}
                  onChange={setRating}
                  onHoverChange={setHoveredRating}
                />
                <span className="ml-2 text-sm text-muted-foreground">
                  {['', 'Bad', 'Okay', 'Good', 'Great', 'Excellent'][
                    hoveredRating || rating
                  ] || 'Select'}
                </span>
              </div>
            </div>

            {/* Review Textarea */}
            <div className="space-y-2">
              <label htmlFor="review" className="text-sm font-medium">
                Your Review
              </label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Describe your experience..."
                className="min-h-28 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t bg-muted/50 p-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default GiveReviewModal;
