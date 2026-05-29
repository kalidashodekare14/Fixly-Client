'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Edit3,
  Briefcase,
  Award,
  Loader2,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useProfileInfoQuery,
  useProfileInfoUpdateMutation,
} from '@/state/services/user/ProfileService';

export type UserRole = 'user' | 'provider' | 'admin';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
};

const Profile = () => {
  // Fetch user data
  const {
    data: profileInfo,
    isLoading: infoLoading,
    refetch,
    error,
  } = useProfileInfoQuery();
  // update user data

  const [profileInfoUpdate, { isLoading: updateLoading, error: updateError }] =
    useProfileInfoUpdateMutation();

  const {
    image,
    name,
    email,
    phone,
    role,
    bio,
    location,
    totalReviews,
    isVerified,
    averageRating,
  } = profileInfo?.data || {};

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      bio: '',
    },
  });

  useEffect(() => {
    if (profileInfo?.data) {
      const user = profileInfo.data;

      reset({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        address: user.location?.address ?? '',
        city: user.location?.city ?? '',
        state: user.location?.state ?? '',
        zipCode: user.location?.zipCode ?? '',
        bio: user.bio ?? '',
      });
    }
  }, [profileInfo, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      formData.append('location[address]', data.address);
      formData.append('location[city]', data.city);
      formData.append('location[state]', data.state);
      formData.append('location[zipCode]', data.zipCode);

      formData.append('bio', data.bio);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await profileInfoUpdate(formData).unwrap();
      if (res?.success) {
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setSaving(false);
    }
  };

  const stats = [
    {
      label: 'Rating',
      value: averageRating,
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      label: 'Reviews',
      value: totalReviews,
      icon: Award,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    // Now is static
    {
      label: 'Completed Jobs',
      value: '500',
      icon: Briefcase,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Member Since',
      value: '2022',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="relative h-40 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 sm:h-48">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <CardContent className="relative px-4 pb-6 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20">
                <div className="size-28 overflow-hidden rounded-full border-4 border-white shadow-xl sm:size-32">
                  <Image
                    src={image || ''}
                    alt={name || ''}
                    width={128}
                    height={128}
                    className="size-full object-cover"
                  />
                </div>
                {isVerified && (
                  <div className="absolute -bottom-1 -right-1 rounded-full border-4 border-white bg-green-500 p-1">
                    <CheckCircle className="size-4 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {name ? name : 'N/A'}
                  </h1>
                  <Badge className="border-0 bg-pink-500/10 capitalize text-pink-600 hover:bg-pink-500/20">
                    <Shield className="mr-1 size-3" />
                    {role ? role : 'N/A'}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {email ? email : 'N/A'}
                </p>
              </div>

              {/* Edit Button */}
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-2"
                onClick={() => setOpen(true)}
              >
                <Edit3 className="size-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={cn(
                    'flex size-12 shrink-0 items-center justify-center rounded-xl',
                    stat.bg
                  )}
                >
                  <stat.icon className={cn('size-5', stat.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bio & Contact */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bio */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-gray-600">
                {bio ? bio : 'Bio not available...'}
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-pink-50">
                  <Mail className="size-4 text-pink-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="truncate text-sm font-medium text-gray-900">
                    {email ? email : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-pink-50">
                  <Phone className="size-4 text-pink-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="truncate text-sm font-medium text-gray-900">
                    {phone ? phone : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-pink-50">
                  <MapPin className="size-4 text-pink-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="truncate text-sm font-medium text-gray-900">
                    {[
                      location?.address,
                      location?.city,
                      location?.state,
                      location?.zipCode,
                    ]
                      .filter(Boolean)
                      .join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border">
                <Image
                  src={imagePreview || ''}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  className="h-11"
                  id="name"
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="h-11"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                className="h-11"
                id="phone"
                placeholder="+880 17XX-XXXXXX"
                {...register('phone')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                className="h-11"
                id="address"
                placeholder="Street address"
                {...register('address')}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  className="h-11"
                  id="city"
                  placeholder="City"
                  {...register('city')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  className="h-11"
                  id="state"
                  placeholder="State"
                  {...register('state')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  className="h-11"
                  id="zipCode"
                  placeholder="Zip Code"
                  {...register('zipCode')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={5}
                placeholder="Tell us about yourself"
                {...register('bio')}
              />
            </div>

            <DialogFooter>
              <Button
                className={'border border-[#E91E63] h-10'}
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={'bg-[#E91E63] h-10'}
                type="submit"
                disabled={saving}
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
