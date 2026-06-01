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
import { Loader2 } from 'lucide-react';

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
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [
    updateRequest,
    { isLoading: requestReqLoading, error: updateReqError },
  ] = useUpdateRequestMutation();

  // filter data

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
      setLocation(editRequestProps.selectedRequest.location);
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
      formData.append('location', JSON.stringify(location));

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
            <Button type="button" onClick={getLocation}>
              Set Location
            </Button>
            {location && (
              <pre className="mt-4 bg-gray-100 p-4 rounded">
                {JSON.stringify(location, null, 2)}
              </pre>
            )}

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
