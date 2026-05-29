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
import { Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type Inputs = {
  category: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
};

export default function CreateRequest() {
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const [createRequest, { isLoading: createLoading }] =
    useCreateRequestMutation();

  console.log(fileError);

  const getLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
        );

        const data = await res.json();

        const result = data.features?.[0]?.properties;

        const formattedLocation = {
          address: result.address_line1 || '',

          city: result.city || result.town || result.village || '',

          division: result.state || '',

          postalCode: result.postcode || '',

          coordinates: [lon, lat],
        };

        console.log(data);

        setLocation(formattedLocation);

        setLocationLoading(false);
      },
      (err) => {
        console.log(err.message);
        setLocationLoading(false);
      }
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!file) {
      return setFileError(true);
    }

    try {
      console.log('data', data);
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('budget', data.budget);
      formData.append('deadline', data.deadline);
      formData.append('location', JSON.stringify(location));

      if (file) {
        formData.append('image', file);
      }
      setLoading(true);
      const res = await createRequest(formData).unwrap();
      if (res?.success) {
        toast.success('Request Create Successfully🎉');
        reset();
      }
    } catch (error: any) {
      console.log(error.message);
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
            >
              <SelectTrigger className="w-full h-12! mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="electric">Electric Repair</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="ac">AC Service</SelectItem>
                  <SelectItem value="cleaning">Home Cleaning</SelectItem>
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

        <Button type="button" onClick={getLocation}>
          Set Location
        </Button>
        {location && (
          <pre className="mt-4 bg-gray-100 p-4 rounded">
            {JSON.stringify(location, null, 2)}
          </pre>
        )}
        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-xl"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Post Request
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
