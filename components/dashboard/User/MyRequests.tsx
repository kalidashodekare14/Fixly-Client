'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OfferDrawer from './OfferDrawer';
import EditRequestModal from './EditRequestModal';

import {
  useMyRequestQuery,
  useViewOffersQuery,
} from '@/state/services/user/RequestService';
import { Card, CardContent } from '@/components/ui/card';
import { IRequest } from '@/types/Request';
import { Search } from 'lucide-react';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
};

export default function MyRequests() {
  const [offerDrawer, setOfferDraser] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string>('');
  const {
    data: requestData,
    isLoading: requestLoading,
    error: requestError,
  } = useMyRequestQuery();

  const requests: IRequest[] = requestData?.data || [];

  const handleEdit = (id: string) => {
    const selectedData = requests.find((data: IRequest) => data._id === id);

    if (selectedData) {
      setSelectedRequest(selectedData);
    }
    setEditModal(true);
    console.log(selectedData);
  };

  const handleViewOffer = (id: string) => {
    setSelectedRequestId(id);
    setOfferDraser(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Requests</h2>
      {requests?.length < 1 && !requestLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Search className="size-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">
            No requests found matching your search.
          </p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests &&
          requests.map((req) => (
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
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusColor[req.status]
                    }`}
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

                  {/* Edit */}
                  <Button
                    onClick={() => handleEdit(req._id)}
                    variant="outline"
                    className="flex-1 h-12 cursor-pointer rounded-xl"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        {requestLoading &&
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
        <EditRequestModal
          editRequestProps={{
            editModal,
            setEditModal,
            selectedRequest,
          }}
        />
        <OfferDrawer
          selectedRequestId={selectedRequestId}
          offerDrawer={offerDrawer}
          setOfferDraser={setOfferDraser}
        />
      </div>
    </div>
  );
}
