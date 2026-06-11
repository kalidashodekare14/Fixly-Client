'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { useViewSelectedOfferForRequestQuery } from '@/state/services/user/RequestService';
import { Card, CardContent } from '@/components/ui/card';
import { IRequest } from '@/types/Request';
import { Search, CalendarDays, User, Star } from 'lucide-react';
import SelectedProviderDrawer from './SelectedProviderDrawer';
import GiveReviewModal from './GiveReviewModal';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  assigned: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const SelectedOffers = () => {
  const [isDrawer, setIsDrawer] = useState<boolean>(false);
  const [reviewDrawer, setReviewDrawer] = useState<boolean>(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>('');
  const [selectedRequestIdForReview, setSelectedRequestIdForReview] =
    useState<string>('');

  const { data: selectedRequestOffer, isLoading: viewSelectedOfferLoading } =
    useViewSelectedOfferForRequestQuery();

  const handleSelectedProvider = (id: string) => {
    setSelectedRequestId(id);
    setIsDrawer(true);
  };

  const handleGiveReview = (id: string) => {
    setSelectedRequestIdForReview(id);
    setReviewDrawer(true);
  };

  console.log('checking selected request id', selectedRequestId);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Selected Providers</h2>
      {!viewSelectedOfferLoading &&
        (!selectedRequestOffer || selectedRequestOffer?.length < 1) && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No requests found matching your search.
            </p>
          </div>
        )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {selectedRequestOffer &&
          selectedRequestOffer.map((req: IRequest) => (
            <div
              key={req._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
            >
              {/* IMAGE */}
              <div className="h-44 w-full relative bg-gray-100 overflow-hidden">
                <Image
                  src={req.image}
                  alt={req.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <span
                  className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${statusColor[req.status]}`}
                >
                  {req.status.replace('_', ' ')}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-[#E91E63] transition-colors duration-200">
                  {req.title}
                </h3>

                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 bg-gray-100 rounded-full">
                    {req.category?.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {req.description}
                </p>

                {/* Budget + Deadline */}
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                  <span className="font-bold text-lg text-gray-800">
                    ৳{req.budget}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <CalendarDays className="size-3.5" />
                    <span>{new Date(req.deadline).toDateString()}</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 pt-1">
                  <Button
                    onClick={() => handleSelectedProvider(req._id)}
                    className="flex-1 h-11 cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl text-sm font-medium"
                  >
                    <User className="size-4 mr-1.5" />
                    Provider
                  </Button>
                  {req.status === 'completed' && !req.isReviewed && (
                    <Button
                      onClick={() => handleGiveReview(req._id)}
                      variant="outline"
                      className="flex-1 h-11 cursor-pointer rounded-xl text-sm font-medium border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white transition-all duration-200"
                    >
                      <Star className="size-4 mr-1.5" />
                      Review
                    </Button>
                  )}
                  {req.status === 'completed' && req.isReviewed && (
                    <Button
                      disabled
                      onClick={() => handleGiveReview(req._id)}
                      variant="outline"
                      className="flex-1 h-11 cursor-pointer rounded-xl text-sm font-medium border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white transition-all duration-200"
                    >
                      <Star className="size-4 mr-1.5" />
                      Reviewed ✓
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        {viewSelectedOfferLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="space-y-3">
                <div className="h-30 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        <SelectedProviderDrawer
          selectedRequestId={selectedRequestId}
          isDrawer={isDrawer}
          setIsDrawer={setIsDrawer}
        />
        <GiveReviewModal
          reviewDrawer={reviewDrawer}
          setReviewDrawer={setReviewDrawer}
          selectedRequestIdForReview={selectedRequestIdForReview}
        />
      </div>
    </div>
  );
};

export default SelectedOffers;
