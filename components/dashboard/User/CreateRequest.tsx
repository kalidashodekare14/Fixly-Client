'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateRequestMutation } from '@/state/services/user/RequestService';
import { Loader2, MapPin, Crosshair } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useGetCategoriesQuery } from '@/state/services/public/publicService';
import { watch } from 'fs';

type Inputs = {
  category: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
};

export default function CreateRequest() {
  const [file, setFile] = useState<File | null>(null);
  // TODO: Location state fields — split like Provider Profile
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const [createRequest, { isLoading: createLoading }] =
    useCreateRequestMutation();
  const { data: categories, isLoading } = useGetCategoriesQuery();

  // TODO: getLocation
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
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!file) {
      return setFileError(true);
    }

    try {
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('budget', data.budget);
      formData.append('deadline', data.deadline);
      formData.append('requestType', 'normal');
      // TODO: Construct location object from individual fields (like Provider Profile)
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
      const res = await createRequest(formData).unwrap();
      if (res?.success) {
        toast.success('Request Create Successfully🎉');
        reset();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6 md:p-8 space-y-6"
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Create Service Request</h2>
          <p className="text-sm text-gray-500">
            Post your issue and get help from providers
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Service Category */}
          <div className="w-full">
            <Label>Service Category</Label>
            <Select
              onValueChange={(value) => setValue('category', value as string)}
              value={watch('category')}
            >
              <SelectTrigger className="w-full h-12! mt-2">
                <SelectValue placeholder="Select category">
                  {categories?.find((c) => c._id === watch('category'))?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {categories
                    ? categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.label}
                        </SelectItem>
                      ))
                    : 'N/A'}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Request Title */}
          <div>
            <Label>Request Title</Label>
            <Input
              {...register('title', { required: true })}
              className={`${errors.title && 'border-2 border-red-200'} h-12 mt-2`}
              placeholder="e.g. AC not cooling"
            />
            {errors.title && (
              <span className="text-red-400">Request title is required</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            {...register('description', { required: true })}
            className={`${errors.description && 'border-2 border-red-200'} min-h-30 mt-2`}
            placeholder="Describe your issue in detail..."
          />
          {errors.description && (
            <span className="text-red-400">Description title is required</span>
          )}
        </div>

        {/* Budget (Single Field) */}
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full">
            <Label>Budget (BDT)</Label>
            <Input
              {...register('budget', { required: true })}
              type="number"
              className={`${errors.budget && 'border-2 border-red-200'} h-12 mt-2`}
              placeholder="e.g. 2000"
            />
            {errors.budget && (
              <span className="text-red-400">Request title is required</span>
            )}
          </div>

          {/* Deadline */}
          <div className="w-full">
            <Label>Deadline</Label>
            <Input
              {...register('deadline', { required: true })}
              type="date"
              className={`${errors.deadline && 'border-2 border-red-200'} h-12 mt-2`}
            />
            {errors.deadline && (
              <span className="text-red-400">Deateline title is required</span>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <Label>Attach File (optional)</Label>

          <div
            className={`${fileError && 'border-red-400 '} mt-2 border-2 border-dashed rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer`}
          >
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="text-sm text-gray-600">
                {file ? file.name : 'Click or drag file to upload'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, PDF up to 10MB
              </p>
            </label>
          </div>
          {fileError && (
            <span className="text-red-400">Attach File is required</span>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TODO: 1. Location section — using individual state fields (like Provider Profile) */}
        {/* ------------------------------------------------------------------ */}
        <div className="border rounded-xl p-5 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              <h3 className="font-semibold text-gray-800">Service Location</h3>
            </div>

            {/* TODO: 2. Detect button — Nominatim (same as Provider Profile), no API key */}
            <Button
              type="button"
              onClick={getLocation}
              disabled={locationLoading}
              className="h-10 cursor-pointer bg-primary hover:bg-primary-hover text-white rounded-xl text-sm gap-2"
            >
              {locationLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Crosshair className="size-4" />
              )}
              {locationLoading ? 'Detecting...' : 'Detect My Location'}
            </Button>
          </div>

          {/* TODO: 3. Location inputs — bound to individual state fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="Street address"
              />
            </div>

            <div>
              <Label>City</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="City"
              />
            </div>

            <div>
              <Label>Division</Label>
              <Input
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="Division"
              />
            </div>

            <div>
              <Label>Postal Code</Label>
              <Input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="Postal code"
              />
            </div>

            <div>
              <Label>Latitude</Label>
              <Input
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="Latitude"
              />
            </div>

            <div>
              <Label>Longitude</Label>
              <Input
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="h-11 mt-1.5"
                placeholder="Longitude"
              />
            </div>
          </div>

          {!address && !latitude && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin className="size-3" />
              Click &quot;Detect My Location&quot; to auto-fill from your
              browser, or type manually.
            </p>
          )}
        </div>
        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-xl"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Post Request
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
