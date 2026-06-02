'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OfferDrawer from './OfferDrawer';

import {
  useMyRequestQuery,
  useViewSelectedOfferForRequestQuery,
} from '@/state/services/user/RequestService';
import { Card, CardContent } from '@/components/ui/card';
import { IRequest } from '@/types/Request';
import { Search } from 'lucide-react';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  assigned: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const SelectedOffers = () => {
  const [offerDrawer, setOfferDraser] = useState<boolean>(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>('');

  const {
    data: viewSelectedOfferForRequest,
    isLoading: viewSelectedOfferLoading,
  } = useViewSelectedOfferForRequestQuery();

  const selectedRequestOffer: IRequest[] =
    viewSelectedOfferForRequest?.data || [];

  const handleViewOffer = (id: string) => {
    setSelectedRequestId(id);
    setOfferDraser(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Selected Providers</h2>
      {selectedRequestOffer?.length < 1 && !viewSelectedOfferLoading && (
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
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-40 w-full relative bg-gray-100">
                <Image
                  src={req.image}
                  alt={req.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="font-semibold text-lg line-clamp-1">
                  {req.title}
                </h3>

                {/* Category + Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {req.category}
                  </span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusColor[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  {req.description}
                </p>

                {/* Budget + Deadline */}
                <div className="flex justify-between text-sm pt-2 border-t">
                  <p className="font-semibold">৳ {req.budget}</p>
                  <p className="text-gray-500">
                    {new Date(req.deadline).toDateString()}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-3">
                  {/* View Offers */}
                  <Button
                    onClick={() => handleViewOffer(req._id)}
                    className="flex-1 h-12 cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl"
                  >
                    View Offers
                  </Button>
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
        <OfferDrawer
          selectedRequestId={selectedRequestId}
          offerDrawer={offerDrawer}
          setOfferDraser={setOfferDraser}
        />
      </div>
    </div>
  );
};

export default SelectedOffers;
