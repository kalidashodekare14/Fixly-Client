'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Crosshair, Upload } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateRequestMutation } from '@/state/services/user/RequestService';
import toast, { Toaster } from 'react-hot-toast';

interface ISelectData {
  _id: string;
  skills: string[];
  rate: number;
  rateType: string;
}

interface IHireModal {
  hireToggle: boolean;
  setHireToggle: React.Dispatch<React.SetStateAction<boolean>>;
  seletedData: ISelectData | null;
}

type Inputs = {
  title: string;
  description: string;
  deadline: string;
};

const HireModal = ({ hireToggle, setHireToggle, seletedData }: IHireModal) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  console.log('checking provider id', seletedData);

  const [createRequest, { isLoading: createLoading }] =
    useCreateRequestMutation();

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
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!seletedData) return;
      const formData = new FormData();
      formData.append('providerId', seletedData._id);
      formData.append('requestType', 'direct');
      formData.append('budget', seletedData.rate.toString());
      formData.append('category', selectedSkill);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('deadline', data.deadline);
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
      setSubmitLoading(true);
      const res = await createRequest(formData).unwrap();
      if (res?.success) {
        toast.success('Request Create Successfully🎉');
        // reset input filed

        reset();
        // modal close
        setHireToggle(false);

        // reset state
        setFile(null);
        setDivision('');
        setAddress('');
        setCity('');
        setLongitude('');
        setLatitude('');
        setPostalCode('');
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Dialog open={hireToggle} onOpenChange={setHireToggle}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Hire Provider</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Image */}
          <div>
            <Label>Attach File (optional)</Label>
            <div className="mt-1.5 border-2 border-dashed rounded-xl p-4 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              <input
                type="file"
                className="hidden"
                id="hireFileUpload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="hireFileUpload"
                className="cursor-pointer flex flex-col items-center gap-1"
              >
                <Upload className="size-5 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload'}
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              {...register('title', { required: true })}
              className="h-11 mt-1.5"
              placeholder="e.g. AC not cooling"
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              {...register('description', { required: true })}
              className="min-h-24 mt-1.5"
              placeholder="Describe your issue in detail..."
            />
          </div>

          {/* Deadline */}
          <div>
            <Label>Deadline</Label>
            <Input
              {...register('deadline', { required: true })}
              type="date"
              className="h-11 mt-1.5"
            />
          </div>

          {/* Skills */}
          {seletedData?.skills && seletedData.skills.length > 0 && (
            <div>
              <Label>Select a Category</Label>
              <div className="flex flex-wrap gap-2 mt-5">
                {seletedData.skills.map((skill: any, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSkill(skill._id)}
                    className={`cursor-pointer rounded-4xl border px-2.5 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                      selectedSkill === skill._id
                        ? 'bg-[#E91E63] text-white border-[#E91E63]'
                        : 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80'
                    }`}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div className="border rounded-xl p-4 bg-gray-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-[#E91E63]" />
                <h3 className="font-semibold text-sm text-gray-800">
                  Service Location
                </h3>
              </div>
              <Button
                type="button"
                onClick={getLocation}
                disabled={locationLoading}
                className="h-9 cursor-pointer bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl text-xs gap-1.5"
              >
                {locationLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Crosshair className="size-3.5" />
                )}
                {locationLoading ? 'Detecting...' : 'Detect'}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="Street address"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="City"
                />
              </div>
              <div>
                <Label>Division</Label>
                <Input
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="Division"
                />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="Postal code"
                />
              </div>
              <div>
                <Label>Latitude</Label>
                <Input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="Latitude"
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="h-10 mt-1"
                  placeholder="Longitude"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl cursor-pointer"
          >
            {submitLoading && <Loader2 className="size-4 animate-spin" />}
            Submit Request
          </Button>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default HireModal;
