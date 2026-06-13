'use client';

import Image from 'next/image';
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  CheckCircle,
  Briefcase,
  Award,
  Shield,
  Wrench,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useProviderDetailsQuery } from '@/state/services/public/publicService';
import { useState } from 'react';
import { useCreateRequestMutation } from '@/state/services/user/RequestService';
import HireModal from './HireModal';

interface ProviderUser {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: string;
}

interface ProviderLocation {
  address?: string;
  city?: string;
  division?: string;
}

interface ProviderDetailsData {
  user?: ProviderUser;
  image?: string;
  bio?: string;
  location?: ProviderLocation;
  services?: string[];
  rate?: number;
  rateType?: string;
  review?: string;
  isVerified?: boolean;
  averageRating?: string;
  experience?: number;
  availableStatus?: boolean;
}

interface ISelectData {
  _id: string;
  skills: string[];
  rate: number;
  rateType: string;
}

const ProviderDetails = ({ paramsId }: { paramsId: string }) => {
  const [hireToggle, setHireToggle] = useState<boolean>(false);
  const [seletedData, setSelectedData] = useState<ISelectData | null>(null);

  //  Provider details info fetch of rtk query
  const {
    data: provider,
    isLoading,
    error,
  } = useProviderDetailsQuery(paramsId);

  const [createRequest, { isLoading: createLoading }] =
    useCreateRequestMutation();

  const {
    _id,
    user,
    bio,
    location,
    skills,
    rate,
    rateType,
    isVerified,
    rating,
    availableStatus,
    experience,
  } = provider?.data || {};

  const stats = [
    {
      label: 'Rating',
      value: rating ?? '0',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      label: 'Reviews',
      value: provider?.review ?? '0',
      icon: Award,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      label: 'Jobs Done',
      value: experience ?? '0',
      icon: Briefcase,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Experience',
      value: experience ? `${experience}+ yrs` : 'N/A',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  const handleHireMe = () => {
    const selectData = {
      _id,
      skills,
      rate,
      rateType,
    };
    setSelectedData(selectData);
    setHireToggle(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden border-0 shadow-xs">
          <div className="relative h-40 bg-linear-to-r from-purple-600 via-primary to-rose-500 sm:h-48">
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
                    <div className="flex size-full items-center justify-center bg-linear-to-br from-purple-500 to-primary text-4xl font-bold text-white">
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
                    {user?.role ? user?.role : 'Provider'}
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
                    {experience ?? 0}+ yrs exp.
                  </span>
                </div>
              </div>

              {/* Hire Button */}
              <button
                onClick={() => handleHireMe()}
                className="cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
              >
                Hire Me
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-xs">
              <CardContent className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 p-4">
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
          <Card className="border-0 shadow-xs lg:col-span-2">
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
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skills && skills.length > 0 ? (
                  skills.map((skill: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 shadow-xs transition-shadow hover:shadow-sm"
                    >
                      <Wrench className="size-4 text-primary" />
                      <span className="text-sm font-medium text-gray-700">
                        {skill.label}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No services listed</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-0 shadow-xs">
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
                      {[location?.address, location?.city, location?.division]
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-0 shadow-xs">
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
                  <span className="text-gray-600">Rate</span>
                  <span className="font-medium text-gray-900">
                    ${rate}/{rateType}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Availability</span>
                  <span
                    className={cn(
                      'font-medium',
                      availableStatus ? 'text-emerald-600' : 'text-gray-400'
                    )}
                  >
                    {availableStatus ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Verified Badge */}
            {isVerified && (
              <Card className="border-0 bg-linear-to-br from-purple-50 to-primary-light shadow-xs">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
                    <Shield className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Verified Provider
                    </p>
                    <p className="text-xs text-gray-500">
                      Identity & credentials verified
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      {/* Hire modal */}
      <HireModal
        hireToggle={hireToggle}
        setHireToggle={setHireToggle}
        seletedData={seletedData}
      />
    </div>
  );
};

export default ProviderDetails;
