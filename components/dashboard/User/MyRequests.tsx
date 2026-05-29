'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OfferDrawer from './OfferDrawer';
import EditRequestModal from './EditRequestModal';
import { useMyRequestQuery } from '@/state/services/user/RequestService';
import { Card, CardContent } from '@/components/ui/card';

interface IRequest {
  id: string;
  image: string;
  title: string;
  category: string;
  status: 'pending' | 'accepted' | 'completed';
  description: string;
  budget: number;
  deadline: string;
  location: {
    address: string;
    city: string;
    division: string;
    postalCode: string;
    coordinates: [];
  };
}

// export const requests: IRequest[] = [
//   {
//     id: 1,
//     title: 'AC not cooling properly',
//     category: 'AC Service',
//     description: 'AC is running but not cooling the room properly.',
//     budget: 2500,
//     deadline: '2026-06-10',
//     image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4',
//     status: 'pending',
//   },
//   {
//     id: 2,
//     title: 'Bathroom leakage issue',
//     category: 'Plumbing',
//     description: 'Water leaking from pipe connection under sink.',
//     budget: 1800,
//     deadline: '2026-06-08',
//     image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
//     status: 'accepted',
//   },
//   {
//     id: 3,
//     title: 'House deep cleaning',
//     category: 'Cleaning',
//     description: 'Need full house deep cleaning service before event.',
//     budget: 3000,
//     deadline: '2026-06-15',
//     image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
//     status: 'completed',
//   },
//   {
//     id: 4,
//     title: 'Ceiling fan repair',
//     category: 'Electric',
//     description: 'Fan is making noise and rotating slowly.',
//     budget: 900,
//     deadline: '2026-06-05',
//     image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
//     status: 'pending',
//   },
//   {
//     id: 5,
//     title: 'Kitchen sink blockage',
//     category: 'Plumbing',
//     description: 'Sink water is not draining properly.',
//     budget: 1200,
//     deadline: '2026-06-07',
//     image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
//     status: 'accepted',
//   },
//   {
//     id: 6,
//     title: 'Room painting service',
//     category: 'Painting',
//     description: 'Need bedroom walls repaint with modern color.',
//     budget: 5000,
//     deadline: '2026-06-20',
//     image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09',
//     status: 'pending',
//   },
//   {
//     id: 7,
//     title: 'WiFi setup & configuration',
//     category: 'Network',
//     description: 'Need router setup and full WiFi optimization.',
//     budget: 1000,
//     deadline: '2026-06-06',
//     image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2',
//     status: 'completed',
//   },
// ];

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
};

export default function MyRequests() {
  const [offerDrawer, setOfferDraser] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const {
    data: requestData,
    isLoading: requestLoading,
    error: requestError,
  } = useMyRequestQuery();

  const requests: IRequest[] = requestData?.data;

  console.log('checking request data', requestData);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Requests</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests &&
          requests.map((req) => (
            <div
              key={req.id}
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
                  <p className="text-gray-500">{req.deadline}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-3">
                  {/* View Offers */}
                  <Button
                    onClick={() => setOfferDraser(true)}
                    className="flex-1 h-12 cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl"
                  >
                    View Offers
                  </Button>

                  {/* Edit */}
                  <Button
                    onClick={() => setEditModal(true)}
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
        <EditRequestModal editModal={editModal} setEditModal={setEditModal} />
        <OfferDrawer
          offerDrawer={offerDrawer}
          setOfferDraser={setOfferDraser}
        />
      </div>
    </div>
  );
}
