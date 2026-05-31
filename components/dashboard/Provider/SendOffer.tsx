'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  DollarSign,
  Search,
  X,
  Loader2,
  Edit3,
  MessageSquare,
  Calendar,
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
import {
  useSendOfferdQuery,
  useSendOfferMutation,
} from '@/state/services/provider/RequestService';

interface IOffer {
  _id: string;
  request: {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    budget: number;
    deadline: string;
    location: {
      address: string;
      city: string;
      division: string;
    };
    user: {
      _id: string;
      name: string;
      image: string;
    };
  };
  offeredPrice: number;
  message: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  accepted: 'bg-green-50 text-green-600 border-green-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
  withdrawn: 'bg-gray-50 text-gray-600 border-gray-200',
};

const SendOffer = () => {
  const [search, setSearch] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editPrice, setEditPrice] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const {
    data: sendOfferdData,
    isLoading: offeredLoading,
    error: offeredError,
  } = useSendOfferdQuery();

  // update offers
  const [sendOffer, { isLoading: sendOfferLoading }] = useSendOfferMutation();

  const myOfferes = sendOfferdData?.data || [];
  console.log('checking offeres', myOfferes);

  console.log('checking offer id', selectedOffer);

  const openEditOffer = (offer: IOffer) => {
    setSelectedOffer(offer);
    setEditPrice(String(offer.offeredPrice));
    setEditDate(offer.estimatedTime);
    setEditMessage(offer.message);
    setDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    const sendData = {
      offeredPrice: editPrice,
      message: editMessage,
      estimatedTime: editDate,
      requestId: selectedOffer?.request?._id,
    };
    try {
      setSaving(true);
      const send = await sendOffer(sendData).unwrap();
      if (send.success) {
        setDialogOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSaving(false);
      setDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto lg:max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sent Offers</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and edit offers you have sent to clients
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by request or client name..."
            className="h-11 w-80 border-gray-200 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Offers Grid */}
        {myOfferes.length < 1 && !offeredLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No offers found matching your search.
            </p>
          </div>
        )}

        {myOfferes.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {myOfferes.map((offer: any) => (
              <Card
                key={offer._id}
                className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={offer?.request?.image}
                    alt={offer?.request?.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge
                      className={`border px-2 py-0.5 text-xs font-medium capitalize ${statusColors[offer.status]}`}
                    >
                      {offer.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="space-y-3 p-4">
                  {/* Title & Category */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {offer?.request?.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-600">
                      {offer?.request?.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {offer?.request?.description}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-2">
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={offer?.request?.user?.image}
                        alt={offer?.request?.user?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {offer?.request?.user?.name}
                    </span>
                  </div>

                  {/* Offer Details Section */}
                  <div className="space-y-2 rounded-lg bg-pink-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="size-4 text-pink-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          ৳{offer?.offeredPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="size-3.5" />
                        <span className="text-xs">
                          {new Date(offer?.estimatedTime).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-gray-500">
                      <MessageSquare className="mt-0.5 size-3 shrink-0" />
                      <span className="line-clamp-2">{offer?.message}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-1.5 text-xs text-gray-400">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    <span className="line-clamp-1">
                      {offer?.request?.location?.address},{' '}
                      {offer?.request?.location?.city},{' '}
                      {offer?.request?.location?.division}
                    </span>
                  </div>

                  {/* Edit Action */}
                  <Button
                    onClick={() => openEditOffer(offer)}
                    className="h-11 w-full gap-2 bg-pink-600 text-white hover:bg-pink-700"
                  >
                    <Edit3 className="size-4" />
                    Edit Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {offeredLoading &&
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

      {/* Edit Offer Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
            <DialogDescription>
              Update your offer for{' '}
              <span className="font-medium text-gray-900">
                {selectedOffer?.request.title}
              </span>
            </DialogDescription>
          </DialogHeader>

          {selectedOffer && (
            <div className="space-y-4">
              {/* Request Summary */}
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={selectedOffer.request.image}
                      alt={selectedOffer.request.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOffer.request.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedOffer.request.user.name} | ৳
                      {selectedOffer.request.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editPrice">Offered Price (৳)</Label>
                <Input
                  id="editPrice"
                  type="number"
                  className="h-11"
                  placeholder="Enter your offered price"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDate">Estimated Completion</Label>
                <Input
                  id="editDate"
                  type="date"
                  className="h-11"
                  value={editDate ? editDate.split('T')[0] : ''}
                  onChange={(e) => setEditDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editMessage">Message</Label>
                <Textarea
                  id="editMessage"
                  rows={4}
                  placeholder="Describe your service, timeline, and any guarantees..."
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
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
              onClick={handleSaveEdit}
              disabled={!editPrice || saving}
              className="bg-pink-600 text-white hover:bg-pink-700"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Edit3 className="size-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendOffer;
