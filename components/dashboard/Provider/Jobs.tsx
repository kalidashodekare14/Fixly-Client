'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  DollarSign,
  Search,
  Loader2,
  ChevronDown,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useJobsInfoQuery,
  useJobStatusChangeMutation,
} from '@/state/services/provider/RequestService';

interface IJob {
  _id: string;
  request: {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    budget: number;
    deadline: string;
    location: {
      address: string;
      city: string;
      division: string;
    };
    user: {
      _id: string;
      name: string;
      image: string;
    };
  };
  offeredPrice: number;
  message: string;
  estimatedTime: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}

const statusColors: Record<string, string> = {
  assigned: 'bg-blue-50 text-blue-600 border-blue-200',
  in_progress: 'bg-amber-50 text-amber-600 border-amber-200',
  completed: 'bg-green-50 text-green-600 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

const Jobs = () => {
  const [search, setSearch] = useState('');

  // job data of rtk query
  const {
    data: jobsData,
    isLoading: jobLoading,
    error: jobsError,
  } = useJobsInfoQuery();

  console.log('checking jobs data', jobsData);

  // job status change of rtk query
  const [jobStatusChange, { isLoading: jobStatusLoading }] =
    useJobStatusChangeMutation();

  const handleStatusChange = async (jobId: string, status: string) => {
    try {
      await jobStatusChange({ jobId, status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto lg:max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and update the status of your ongoing jobs
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search job or client name..."
            className="h-11 w-80 border-gray-200 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Jobs Grid */}
        {!jobLoading && (!jobsData || jobsData.length < 1) && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No jobs found matching your search.
            </p>
          </div>
        )}

        {!jobLoading && (jobsData || jobsData.length > 0) && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {jobsData.map((job: any) => {
              return (
                <Card
                  key={job._id}
                  className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-gray-100">
                    <Image
                      src={job.image}
                      alt={job.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge
                        className={`border px-2 py-0.5 text-xs font-medium capitalize ${statusColors[job.status]}`}
                      >
                        {job.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="space-y-3 p-4">
                    {/* Title & Category */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {job.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-600">
                        {job.category?.label}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                      {job.description}
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-2">
                      <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={job.user.image}
                          alt={job.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {job.user.name}
                      </span>
                    </div>

                    {/* Offer Summary
                    <div className="space-y-2 rounded-lg bg-pink-50/50 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="size-4 text-pink-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            ৳{job.offeredPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="size-3.5" />
                          <span className="text-xs">
                            {new Date(job.estimatedTime).toDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5 text-xs text-gray-500">
                        <MessageSquare className="mt-0.5 size-3 shrink-0" />
                        <span className="line-clamp-2">{job.message}</span>
                      </div>
                    </div> */}

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-gray-400">
                      <MapPin className="mt-0.5 size-3 shrink-0" />
                      <span className="line-clamp-1">
                        {job.location.address}, {job.location.city},{' '}
                        {job.location.division}
                      </span>
                    </div>

                    {/* Status Update */}
                    {job.status === 'completed' ||
                    job.status === 'cancelled' ? (
                      <Button
                        disabled
                        className="h-11 w-full gap-2 bg-gray-100 text-black"
                      >
                        {job?.request?.status}
                      </Button>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className={'w-full '}>
                          <Button className={'w-full bg-primary capitalize'}>
                            {job?.status}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                          {[
                            'assigned',
                            'in_progress',
                            'completed',
                            'cancelled',
                          ].map((status) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() =>
                                handleStatusChange(job?._id, status)
                              }
                              className="cursor-pointer capitalize"
                            >
                              {status.replace('_', ' ')}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {jobLoading &&
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
        </div>
      </div>
    </div>
  );
};

export default Jobs;
