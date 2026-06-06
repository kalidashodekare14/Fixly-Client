'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  DollarSign,
  Send,
  Search,
  X,
  Loader2,
  User,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  useIncomingRequestsQuery,
  useSendOfferMutation,
} from '@/state/services/provider/RequestService';

interface IIncomingRequest {
  _id: string;
  user: {
    _id: string;
    name: string;
    image: string;
  };
  image: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  location: {
    address: string;
    city: string;
    division: string;
  };
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}

const categories = [
  'All',
  'AC Repair',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Painting',
];
const urgencyColors: Record<string, string> = {
  pending: 'bg-[#FFC6C6] text-[#3F3F3F] border-red-200',
  assigned: 'bg-amber-50 text-amber-600 border-amber-200',
  in_progress: 'bg-green-50 text-green-600 border-green-200',
  completed: 'bg-blue-50 text-green-600 border-green-200',
  cancelled: 'bg-yellow-50 text-green-600 border-green-200',
};

const IncomingRequest = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRequest, setSelectedRequest] =
    useState<IIncomingRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerDate, setOfferDate] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [sending, setSending] = useState(false);

  console.log('checking selected', selectedRequest);

  // incoming request data of rtk query
  const {
    data: requestData,
    isLoading: requestLoading,
    error: requestError,
  } = useIncomingRequestsQuery();

  console.log('checking request', requestData);

  // send offer
  const [sendOffer, { isLoading: sendOfferLoading }] = useSendOfferMutation();

  const openSendOffer = (req: any) => {
    setSelectedRequest(req?.request);
    setOfferPrice('');
    setOfferDate('');
    setOfferMessage('');
    setDialogOpen(true);
  };

  const handleSendOffer = async () => {
    const sendData = {
      offeredPrice: offerPrice,
      message: offerMessage,
      estimatedTime: offerDate,
      requestId: selectedRequest?._id,
    };

    try {
      setSending(true);
      const send = await sendOffer(sendData).unwrap();
      if (send.success) {
        setDialogOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSending(false);
      setDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto lg:max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Incoming Requests
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse requests from clients and send your offers
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search requests or clients..."
              className="h-11 w-80 border-gray-200 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Request Cards Grid */}
        {requestData < 1 && !requestLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No requests found matching your search.
            </p>
          </div>
        )}
        {requestData && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {requestData.map((req: any) => (
              <Card
                key={req._id}
                className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={req?.request?.image}
                    alt={req.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge
                      className={cn(
                        'border px-2 py-0.5 text-xs font-medium capitalize',
                        urgencyColors[req?.request?.status]
                      )}
                    >
                      {req?.request?.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="space-y-3 p-4">
                  {/* Title & Category */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {req?.request?.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-600">
                      {req?.request?.category?.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {req?.request?.description}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-2">
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={req?.request?.user?.image}
                        alt={req?.request?.user?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {req?.request?.user?.name}
                    </span>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="flex items-center justify-between border-t pt-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="size-4 text-pink-600" />
                      <span className="font-semibold text-gray-900">
                        ৳{req?.request?.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="size-3.5" />
                      <span className="text-xs">
                        {new Date(req?.request?.deadline).toDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-1.5 text-xs text-gray-400">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    <span className="line-clamp-1">
                      {req?.request?.location?.address},{' '}
                      {req?.request?.location?.city},{' '}
                      {req?.request?.location?.division}
                    </span>
                  </div>

                  {/* Action */}
                  <Button
                    onClick={() => openSendOffer(req)}
                    className="h-11 w-full gap-2 bg-pink-600 text-white hover:bg-pink-700"
                  >
                    <Send className="size-4" />
                    Send Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
        </div>
      </div>

      {/* Send Offer Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Offer</DialogTitle>
            <DialogDescription>
              Submit your offer for{' '}
              <span className="font-medium text-gray-900">
                {selectedRequest?.title}
              </span>
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Request Summary */}
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={selectedRequest.image}
                      alt={selectedRequest.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedRequest.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="size-3" />
                      <span>{selectedRequest?.user.name}</span>
                      <span>|</span>
                      <span>৳{selectedRequest?.budget}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offerPrice">Your Price (৳)</Label>
                <Input
                  id="offerPrice"
                  type="number"
                  className="h-11"
                  placeholder="Enter your offered price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="offerDate">Estimated Completion</Label>
                <Input
                  id="offerDate"
                  type="date"
                  className="h-11"
                  value={offerDate}
                  onChange={(e) => setOfferDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="offerMessage">Message</Label>
                <Textarea
                  id="offerMessage"
                  rows={4}
                  placeholder="Describe your service, timeline, and any guarantees..."
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
              onClick={() => setDialogOpen(false)}
            >
              <X className="size-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSendOffer}
              disabled={!offerPrice || sending}
              className="bg-pink-600 text-white hover:bg-pink-700"
            >
              {sending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {sending ? 'Sending...' : 'Send Offer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomingRequest;
