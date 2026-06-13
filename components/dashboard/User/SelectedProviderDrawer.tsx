'use client';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useSelectedProviderQuery } from '@/state/services/user/RequestService';

interface IDrawerProps {
  selectedRequestId: string;
  isDrawer: boolean;
  setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedProviderDrawer = ({
  selectedRequestId,
  setIsDrawer,
  isDrawer,
}: IDrawerProps) => {
  const { data: selectedProvider } = useSelectedProviderQuery({
    requestId: selectedRequestId,
  });

  const providerData = selectedProvider?.request;
  const offerData = selectedProvider?.offer;

  console.log('selected id', selectedRequestId);

  console.log('selected provider', selectedProvider);

  return (
    <Drawer direction="right" open={isDrawer} onOpenChange={setIsDrawer}>
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
          {providerData && (
            <div className="border rounded-xl p-4 space-y-3 hover:shadow-md transition bg-white">
              {/* Provider */}
              <div className="flex items-center gap-3">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  src={providerData?.provider?.user?.image}
                  alt={providerData?.provider?.user?.name}
                />

                <div className="leading-tight">
                  <h3 className="font-semibold text-sm">
                    {providerData?.provider?.user?.name}
                  </h3>

                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {providerData?.provider?.user?.role}
                  </span>
                </div>
              </div>
              {offerData && (
                <>
                  {/* Message */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {offerData.message}
                  </p>

                  {/* Price + Time */}
                  <div className="flex flex-col text-sm pt-2 border-t">
                    <div className="flex justify-between items-center">
                      {/* Price */}
                      <div>
                        <p className="text-xs text-gray-500">Price Offer</p>
                        <p className="font-semibold text-primary">
                          ৳ {offerData.offeredPrice}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Estimated Time</p>
                        <p className="font-medium">
                          {new Date(offerData.estimatedTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      {offerData.status === 'accepted' && (
                        <p className="text-primary mt-2">
                          You have selected this offer
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* Action */}
              <div className="flex items-center gap-5">
                <button className="w-full mt-2 py-2 cursor-pointer rounded-lg border border-primary  text-sm hover:bg-primary-light transition">
                  View Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* {viewOffers.length < 1 && !offerLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Search className="size-12 text-gray-300" />
              <p className="mt-3 text-sm text-gray-500">
                No requests found matching your search.
              </p>
            </div>
          )}
        
        <div className="space-y-2">
          {offerLoading &&
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
        </div> */}
      </DrawerContent>
    </Drawer>
  );
};

export default SelectedProviderDrawer;
