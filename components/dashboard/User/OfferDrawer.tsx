import { Drawer, DrawerContent } from '@/components/ui/drawer';

interface IOfferDrawer {
  offerDrawer: boolean;
  setOfferDraser: React.Dispatch<React.SetStateAction<boolean>>;
}

// Offer data
const offers = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    name: 'Rahim Uddin',
    role: 'provider',
    message: 'I can fix your AC issue within short time with warranty.',
    offeredPrice: 2200,
    estimatedTime: '2026-05-27T10:00:00.000+00:00',
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Karim Ahmed',
    role: 'provider',
    message: 'Leakage issue will be fixed permanently.',
    offeredPrice: 1500,
    estimatedTime: '2026-05-27T12:30:00.000+00:00',
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Nusrat Jahan',
    role: 'provider',
    message: 'Full house deep cleaning with eco products.',
    offeredPrice: 3000,
    estimatedTime: '2026-05-28T09:00:00.000+00:00',
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
    name: 'Hasan Mahmud',
    role: 'provider',
    message: 'Fan, switch, wiring everything I can handle.',
    offeredPrice: 800,
    estimatedTime: '2026-05-27T08:00:00.000+00:00',
  },
  {
    id: 5,
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    name: 'Sohel Rana',
    role: 'provider',
    message: 'AC servicing with full gas refill support.',
    offeredPrice: 2500,
    estimatedTime: '2026-05-28T11:00:00.000+00:00',
  },
  {
    id: 6,
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'Ayesha Akter',
    role: 'provider',
    message: 'Room painting with premium color finish.',
    offeredPrice: 4800,
    estimatedTime: '2026-05-29T10:00:00.000+00:00',
  },
  {
    id: 7,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    name: 'Rakib Hossain',
    role: 'provider',
    message: 'Kitchen sink blockage fix guaranteed.',
    offeredPrice: 1100,
    estimatedTime: '2026-05-27T07:30:00.000+00:00',
  },
  {
    id: 8,
    image: 'https://randomuser.me/api/portraits/men/63.jpg',
    name: 'Imran Khan',
    role: 'provider',
    message: 'WiFi setup + speed optimization included.',
    offeredPrice: 1200,
    estimatedTime: '2026-05-27T14:00:00.000+00:00',
  },
  {
    id: 9,
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: 'Shabnam Sultana',
    role: 'provider',
    message: 'Deep cleaning with kitchen & bathroom focus.',
    offeredPrice: 2700,
    estimatedTime: '2026-05-28T15:00:00.000+00:00',
  },
  {
    id: 10,
    image: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'Mehedi Hasan',
    role: 'provider',
    message: 'Door lock, fan, switch everything I repair.',
    offeredPrice: 900,
    estimatedTime: '2026-05-27T09:30:00.000+00:00',
  },
];

const OfferDrawer = ({ offerDrawer, setOfferDraser }: IOfferDrawer) => {
  return (
    <Drawer direction="right" open={offerDrawer} onOpenChange={setOfferDraser}>
      <DrawerContent className="w-105 p-0 bg-white flex flex-col">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b p-4">
          <h2 className="text-lg font-semibold">Service Offers</h2>
          <p className="text-xs text-gray-500">
            Compare providers and choose best offer
          </p>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="border rounded-xl p-4 space-y-3 hover:shadow-md transition bg-white"
            >
              {/* Provider */}
              <div className="flex items-center gap-3">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  src={offer.image}
                  alt={offer.name}
                />

                <div className="leading-tight">
                  <h3 className="font-semibold text-sm">{offer.name}</h3>

                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {offer.role}
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {offer.message}
              </p>

              {/* Price + Time */}
              <div className="flex justify-between text-sm pt-2 border-t">
                {/* Price */}
                <div>
                  <p className="text-xs text-gray-500">Price Offer</p>
                  <p className="font-semibold text-[#E91E63]">
                    ৳ {offer.offeredPrice}
                  </p>
                </div>

                {/* Time */}
                <div className="text-right">
                  <p className="text-xs text-gray-500">Estimated Time</p>
                  <p className="font-medium">
                    {new Date(offer.estimatedTime).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button className="w-full mt-2 py-2 rounded-lg bg-[#E91E63] text-white text-sm hover:bg-[#d81b60] transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OfferDrawer;
