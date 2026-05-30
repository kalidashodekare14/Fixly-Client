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

interface IIncomingRequest {
  _id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  clientName: string;
  clientImage: string;
  location: {
    address: string;
    city: string;
    division: string;
  };
  urgency: 'low' | 'medium' | 'high';
}

const requests: IIncomingRequest[] = [
  {
    _id: '1',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    title: 'AC not cooling properly',
    category: 'AC Repair',
    description:
      'My split AC is running but not cooling. Gas might be low. Need someone to check and fix as soon as possible.',
    budget: 2500,
    deadline: '2026-06-02',
    clientName: 'Rahul Sharma',
    clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: {
      address: 'House 12, Road 5',
      city: 'Mirpur',
      division: 'Dhaka',
    },
    urgency: 'high',
  },
  {
    _id: '2',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    title: 'Kitchen sink leaking',
    category: 'Plumbing',
    description:
      'Water pipe under the kitchen sink is leaking. Need urgent plumbing service to fix the leakage.',
    budget: 1200,
    deadline: '2026-06-01',
    clientName: 'Priya Das',
    clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: {
      address: 'Flat 3B, Block C',
      city: 'Banani',
      division: 'Dhaka',
    },
    urgency: 'high',
  },
  {
    _id: '3',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
    title: 'Room painting needed',
    category: 'Painting',
    description:
      'Need painting for 2 bedrooms. Walls are in good condition, just need a fresh coat of paint.',
    budget: 8000,
    deadline: '2026-06-10',
    clientName: 'Amit Khan',
    clientImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    location: { address: 'Road 3, House 8', city: 'Uttara', division: 'Dhaka' },
    urgency: 'low',
  },
  {
    _id: '4',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400',
    title: 'Full house deep cleaning',
    category: 'Cleaning',
    description:
      'Need deep cleaning for a 3-bedroom apartment. Includes kitchen, bathrooms, and all rooms.',
    budget: 3500,
    deadline: '2026-06-05',
    clientName: 'Sneha Roy',
    clientImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: { address: 'Apartment 5A', city: 'Gulshan', division: 'Dhaka' },
    urgency: 'medium',
  },
  {
    _id: '5',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
    title: 'Fan regulator switch repair',
    category: 'Electrical',
    description:
      'Ceiling fan regulator is not working. Fan runs at full speed only. Need to replace or repair the regulator.',
    budget: 600,
    deadline: '2026-06-03',
    clientName: 'Imran Hossain',
    clientImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    location: {
      address: 'Road 12, House 45',
      city: 'Mohammadpur',
      division: 'Dhaka',
    },
    urgency: 'low',
  },
  {
    _id: '6',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400',
    title: 'Water heater installation',
    category: 'Plumbing',
    description:
      'Need to install a new geyser/water heater in the bathroom. Unit is already purchased.',
    budget: 1500,
    deadline: '2026-06-07',
    clientName: 'Nasrin Akter',
    clientImage: 'https://randomuser.me/api/portraits/women/26.jpg',
    location: {
      address: 'Block D, Flat 7',
      city: 'Baridhara',
      division: 'Dhaka',
    },
    urgency: 'medium',
  },
];

const categories = [
  'All',
  'AC Repair',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Painting',
];
const urgencyColors: Record<string, string> = {
  high: 'bg-red-50 text-red-600 border-red-200',
  medium: 'bg-amber-50 text-amber-600 border-amber-200',
  low: 'bg-green-50 text-green-600 border-green-200',
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

  const filtered = requests.filter((req) => {
    const matchCategory =
      activeCategory === 'All' || req.category === activeCategory;
    const matchSearch =
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.clientName.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openSendOffer = (req: IIncomingRequest) => {
    setSelectedRequest(req);
    setOfferPrice('');
    setOfferDate('');
    setOfferMessage('');
    setDialogOpen(true);
  };

  const handleSendOffer = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setDialogOpen(false);
    }, 1000);
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
          <Badge className="w-fit border-0 bg-pink-500/10 px-3 py-1 text-sm text-pink-600">
            {filtered.length} Requests
          </Badge>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search requests or clients..."
              className="h-11 border-gray-200 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  activeCategory === cat
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Request Cards Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No requests found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((req) => (
              <Card
                key={req._id}
                className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={req.image}
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
                        urgencyColors[req.urgency]
                      )}
                    >
                      {req.urgency} priority
                    </Badge>
                  </div>
                </div>

                <CardContent className="space-y-3 p-4">
                  {/* Title & Category */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {req.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-600">
                      {req.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {req.description}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-2">
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={req.clientImage}
                        alt={req.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {req.clientName}
                    </span>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="flex items-center justify-between border-t pt-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="size-4 text-pink-600" />
                      <span className="font-semibold text-gray-900">
                        ৳{req.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="size-3.5" />
                      <span className="text-xs">{req.deadline}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-1.5 text-xs text-gray-400">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    <span className="line-clamp-1">
                      {req.location.address}, {req.location.city},{' '}
                      {req.location.division}
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
                      <span>{selectedRequest.clientName}</span>
                      <span>|</span>
                      <span>৳{selectedRequest.budget.toLocaleString()}</span>
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
