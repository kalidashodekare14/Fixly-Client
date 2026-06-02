'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IRequest } from '@/types/Request';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useUpdateRequestMutation } from '@/state/services/user/RequestService';
import toast from 'react-hot-toast';
import { Loader2, MapPin, Crosshair } from 'lucide-react';

interface IEditRequestModal {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRequest: IRequest | null;
}

type Inputs = {
  title: string;
  budget: number;
  deadline: string;
  category: string;
  description: string;
};

const EditRequestModal = ({
  editRequestProps,
}: {
  editRequestProps: IEditRequestModal;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  // TODO: Location state fields — split like Provider Profile & CreateRequest
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [
    updateRequest,
    { isLoading: requestReqLoading, error: updateReqError },
  ] = useUpdateRequestMutation();

  // TODO: getLocation — using Nominatim (same as Provider Profile), no API key needed
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat.toString());
        setLongitude(lng.toString());

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`,
            { headers: { 'User-Agent': 'Fixly-Client/1.0' } }
          );
          const data = await res.json();
          const addr = data.address || {};

          setAddress(
            [addr.road, addr.house_number, addr.suburb]
              .filter(Boolean)
              .join(', ')
          );
          setCity(addr.city || addr.town || addr.village || addr.county || '');
          setDivision(addr.state || '');
          setPostalCode(addr.postcode || '');
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
        }

        setLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationLoading(false);
      }
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      budget: 0,
      deadline: '',
      category: '',
      description: '',
    },
  });

  // TODO: Populate individual location fields from selected request
  useEffect(() => {
    if (editRequestProps.selectedRequest) {
      const request = editRequestProps.selectedRequest;
      reset({
        title: request?.title ?? '',
        budget: request?.budget ?? 0,
        deadline: request?.deadline ?? '',
        category: request?.category ?? '',
        description: request?.description ?? '',
      });

      const loc = request.location;
      setAddress(loc?.address || '');
      setCity(loc?.city || '');
      setDivision(loc?.division || '');
      setPostalCode(loc?.postalCode || '');
      setLatitude(loc?.coordinates?.[1]?.toString() || '');
      setLongitude(loc?.coordinates?.[0]?.toString() || '');
    }
  }, [editRequestProps.selectedRequest, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // if (!file) {
    //   return setFileError(true);
    // }

    try {
      console.log('data', data);
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('budget', data.budget.toString());
      formData.append('deadline', data.deadline);
      // TODO: Construct location object from individual fields (like CreateRequest)
      formData.append(
        'location',
        JSON.stringify({
          address,
          city,
          division,
          postalCode,
          coordinates: [longitude, latitude],
        })
      );

      if (file) {
        formData.append('image', file);
      }
      setLoading(true);
      const res = await updateRequest(formData).unwrap();
      if (res?.success) {
        toast.success('Request Update Successfully🎉');
        reset();
        editRequestProps.setEditModal(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={editRequestProps.editModal}
      onOpenChange={editRequestProps.setEditModal}
    >
      <DialogContent className="max-w-1xl! max-h-[90vh] overflow-y-auto rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Edit Request</h2>
            <p className="text-sm text-gray-500">
              Update your service request details
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center gap-5">
              {/* Request Title */}
              <div className="w-full">
                <Label>Request Title</Label>
                <Input
                  {...register('title')}
                  className="h-12 mt-2"
                  placeholder="Enter title"
                />
              </div>

              {/* Category */}
              <div className="w-full">
                <Label>Category</Label>
                <Select
                  value={watch('category')}
                  onValueChange={(value) =>
                    setValue('category', value as string)
                  }
                >
                  <SelectTrigger className="w-full h-12! mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ac">AC Service</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label>Message</Label>
              <Textarea
                {...register('description')}
                className="min-h-30 mt-2"
                placeholder="Describe your issue..."
              />
            </div>

            {/* Budget + Deadline */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Budget (BDT)</Label>
                <Input
                  {...register('budget')}
                  type="number"
                  className="h-12 mt-2"
                />
              </div>

              <div>
                <Label>Deadline</Label>
                <Input
                  {...register('deadline')}
                  type="date"
                  className="h-12 mt-2"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Image</Label>

              <div className="mt-2 border-2 border-dashed rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <input
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  type="file"
                  className="hidden"
                  id="editImage"
                />

                <label htmlFor="editImage" className="cursor-pointer">
                  <p className="text-sm text-gray-600">
                    {file ? file.name : 'Click or drag file to upload'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------------------ */}
            {/* TODO: Location section — individual fields (like CreateRequest)     */}
            {/* ------------------------------------------------------------------ */}
            <div className="border rounded-xl p-4 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#E91E63]" />
                  <h3 className="text-sm font-semibold text-gray-800">
                    Service Location
                  </h3>
                </div>

                <Button
                  type="button"
                  onClick={getLocation}
                  disabled={locationLoading}
                  className="h-9 cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-lg text-xs gap-1.5"
                >
                  {locationLoading ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Crosshair className="size-3.5" />
                  )}
                  {locationLoading ? 'Detecting...' : 'Detect My Location'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <Label className="text-xs">Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-10 mt-1 text-sm"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <Label className="text-xs">City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-10 mt-1 text-sm"
                    placeholder="City"
                  />
                </div>

                <div>
                  <Label className="text-xs">Division</Label>
                  <Input
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="h-10 mt-1 text-sm"
                    placeholder="Division"
                  />
                </div>

                <div>
                  <Label className="text-xs">Postal Code</Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="h-10 mt-1 text-sm"
                    placeholder="Postal code"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Latitude</Label>
                    <Input
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="h-10 mt-1 text-sm"
                      placeholder="Lat"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Longitude</Label>
                    <Input
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="h-10 mt-1 text-sm"
                      placeholder="Lng"
                    />
                  </div>
                </div>
              </div>

              {!address && !latitude && (
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin className="size-3" />
                  Click &quot;Detect My Location&quot; or type manually.
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Update Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRequestModal;
