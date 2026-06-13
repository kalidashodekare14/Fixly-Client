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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
  Clock,
  Wrench,
  PaintBucket,
  Zap,
  Droplets,
  Thermometer,
  Hash,
  ToolCase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useProfileInfoQuery,
  useProfileInfoUpdateMutation,
} from '@/state/services/provider/ProfileService';
import { useGetCategoriesQuery } from '@/state/services/public/publicService';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  rate: number;
  rateType: string;
  availableStatus: string;
};

const Profile = () => {
  const { data: profileInfo, isLoading: infoLoading } = useProfileInfoQuery();

  const [profileInfoUpdate, { isLoading: updateLoading }] =
    useProfileInfoUpdateMutation();

  const { data: categories, isLoading } = useGetCategoriesQuery();

  console.log('checking provider data', profileInfo?.data);

  const {
    user,
    image,
    bio,
    location,
    skills: providerSkills,
    rate,
    rateType,
    review,
    totalReviews,
    isVerified,
    averageRating,
  } = profileInfo?.data || {};

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(image);
  const [skills, setSkills] = useState<string[]>([]);
  console.log('checking skills', skills);
  // Location state fields — address, city, division, lat, lng
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image file set
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Browser geolocation — lat/lng + reverse geocoding via Nominatim (free, no API key)
  const getLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat.toString());
        setLongitude(lng.toString());

        // Reverse geocode lat/lng → address, city, division using OpenStreetMap Nominatim
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`,
            { headers: { 'User-Agent': 'Fixly-Client/1.0' } }
          );
          const data = await res.json();
          const addr = data.address || {};

          // Nominatim returns data.address with fields like road, city, state, country etc.
          setAddress(
            [addr.road, addr.house_number, addr.suburb]
              .filter(Boolean)
              .join(', ')
          );
          setCity(addr.city || addr.town || addr.village || addr.county || '');
          setDivision(addr.state || '');
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      bio: '',
      rate: 0,
      rateType: 'hourly',
      availableStatus: 'true',
    },
  });

  useEffect(() => {
    if (profileInfo?.data) {
      const provider = profileInfo.data;
      reset({
        name: provider.user.name ?? '',
        email: provider.user.email ?? '',
        phone: provider.user.phone ?? '',
        bio: provider.bio ?? '',
      });

      setImagePreview(provider.user.image);

      // Populate location fields from existing profile data
      setAddress(provider.location?.address ?? '');
      setCity(provider.location?.city ?? '');
      setDivision(provider.location?.division ?? '');
      setLatitude(provider.location?.coordinates[0]);
      setLongitude(provider.location?.coordinates[1]);

      const cats = (provider as any).skills.map((skills: any) => skills._id);

      if (cats) {
        setSkills(cats);
      }

      setValue('rate', (provider as any).rate ?? 0);
      setValue('rateType', (provider as any).rateType ?? 'hourly');
      setValue('availableStatus', (provider as any).availableStatus ?? 'true');
    }
  }, [profileInfo?.data, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      formData.append('bio', data.bio);
      formData.append('rate', String(data.rate));
      formData.append('rateType', data.rateType);
      formData.append('availableStatus', data.availableStatus);
      formData.append('skills', JSON.stringify(skills));

      // Append location fields to form data
      formData.append(
        'location',
        JSON.stringify({
          address,
          city,
          division,
          coordinates: [longitude, latitude],
        })
      );

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
      value: averageRating ?? '0',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      label: 'Reviews',
      value: review ?? '0',
      icon: Award,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      label: 'Completed Jobs',
      value: '486',
      icon: Briefcase,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Experience',
      value: '12+ Years',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  if (infoLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="relative h-40 bg-linear-to-r from-purple-600 via-pink-500 to-rose-500 sm:h-48">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          </div>

          <CardContent className="relative px-4 pb-6 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20">
                <div className="size-28 overflow-hidden rounded-full border-4 border-white shadow-xl sm:size-32">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt={user?.name || ''}
                      width={128}
                      height={128}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 text-4xl font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                  )}
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
                    {user?.name ? user?.name : 'N/A'}
                  </h1>
                  <Badge className="border-0 bg-purple-500/10 capitalize text-purple-600 hover:bg-purple-500/20">
                    <Shield className="mr-1 size-3" />
                    {user?.role ? user?.role : 'N/A'}
                  </Badge>
                  {isVerified && (
                    <Badge
                      variant="secondary"
                      className="border-0 bg-green-50 text-green-600"
                    >
                      <CheckCircle className="mr-1 size-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {user?.email ? user?.email : 'N/A'}
                </p>
                <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-400 sm:justify-start">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {location?.city ? location.city : 'N/A'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="size-3" />
                    12+ years exp.
                  </span>
                </div>
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* About */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-gray-600">
                {bio ? bio : 'No bio available...'}
              </p>
            </CardContent>
            <Separator className="mx-4 w-auto" />
            {/* Services Offered */}
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {providerSkills ? (
                  providerSkills.map((skill: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 shadow-xs transition-shadow hover:shadow-sm"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {skill?.label}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No Skills</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                    <Mail className="size-4 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user?.email ? user?.email : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                    <Phone className="size-4 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user?.phone ? user?.phone : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                    <MapPin className="size-4 text-purple-600" />
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

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-emerald-600">
                    &lt; 30 min
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Service Area</span>
                  <span className="font-medium text-gray-900">500 miles</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Start Rate</span>
                  <span className="font-medium text-gray-900">
                    ${rate}/{rateType}
                  </span>{' '}
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium text-gray-900">
                    Bikash, Nagad
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Badge */}
            <Card className="border-0 bg-linear-to-br from-purple-50 to-pink-50 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
                  <Shield className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Insured & Bonded
                  </p>
                  <p className="text-xs text-gray-500">
                    Liability coverage up to $2M
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your professional information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={64}
                    height={64}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'P'}
                  </div>
                )}
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
                placeholder="+1 (555) 000-0000"
                {...register('phone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={5}
                placeholder="Tell us about your experience and expertise"
                {...register('bio')}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Rate */}
              <div className="space-y-2">
                <Label htmlFor="rate">Rate ($)</Label>
                <Input
                  className="h-11"
                  id="rate"
                  type="number"
                  placeholder="80"
                  {...register('rate', { valueAsNumber: true })}
                />
              </div>
              {/* Rate Type */}
              <div className="space-y-2">
                <Label htmlFor="rateType">Rate Type</Label>
                <Select
                  value={watch('rateType')}
                  onValueChange={(val) => setValue('rateType', val ?? 'hourly')}
                >
                  <SelectTrigger className="h-11! w-full">
                    <SelectValue placeholder="Select rate type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableStatus">Available Status</Label>
              <Select
                value={watch('availableStatus')}
                onValueChange={(val) =>
                  setValue('availableStatus', val ?? 'true')
                }
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Service Categories</Label>
              <div className="grid grid-cols-2 gap-2 max-h-30 overflow-y-auto border rounded-lg p-3">
                {categories
                  ? categories.map((cat) => (
                      <label
                        key={cat._id}
                        className={cn(
                          'flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors',
                          skills?.includes(cat._id)
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={skills?.includes(cat._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSkills((prev) => [...prev, cat._id]);
                            } else {
                              setSkills((prev) =>
                                prev.filter((v) => v !== cat._id)
                              );
                            }
                          }}
                        />
                        {cat.label}
                      </label>
                    ))
                  : 'N/A'}
              </div>
            </div>

            {/* Location form section — address, city, division, lat, lng */}
            <Separator />
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Location</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    className="h-11"
                    id="address"
                    placeholder="Street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    className="h-11"
                    id="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Input
                    className="h-11"
                    id="division"
                    placeholder="Division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    className="h-11"
                    id="latitude"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    className="h-11"
                    id="longitude"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getLocation}
                className="gap-2"
              >
                <MapPin className="size-4" />
                Get Current Location
              </Button>
            </div>

            <DialogFooter>
              <Button
                className="border-primary h-10"
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary h-10"
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

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header Skeleton */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="relative h-40 bg-muted sm:h-48" />
          <CardContent className="relative px-4 pb-6 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
              <div className="relative -mt-16 sm:-mt-20">
                <Skeleton className="size-28 rounded-full border-4 border-white sm:size-32" />
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="mx-auto h-4 w-44 sm:mx-0" />
                <div className="flex items-center justify-center gap-4 sm:justify-start">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-9 w-32 shrink-0 rounded-md" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <Skeleton className="size-12 shrink-0 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About + Sidebar Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <div className="mx-4 my-2 h-px bg-border" />
            <CardHeader>
              <Skeleton className="h-5 w-12" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-24 rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-20" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted/30 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
