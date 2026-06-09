'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Eye,
  MessageSquare,
  DollarSign,
  Tag,
  User,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { useManageRequestsQuery } from '@/state/services/admin/AdminService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  in_progress: 'bg-blue-50 text-blue-600 border-blue-200',
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
};

const priorityStyles: Record<string, string> = {
  low: 'bg-gray-100 text-gray-500 border-gray-200',
  medium: 'bg-amber-50 text-amber-600 border-amber-200',
  high: 'bg-red-50 text-red-600 border-red-200',
};

interface RequestItem {
  id: string;
  user: { name: string; email: string; image?: string };
  service: string;
  category: {
    label: string;
  };
  description: string;
  budget: number;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: number;
}

const mockRequests: RequestItem[] = [
  {
    id: 'REQ-001',
    user: { name: 'Alice Johnson', email: 'alice@example.com', image: '' },
    service: 'Home Plumbing Repair',
    category: { label: 'Plumbing' },
    description:
      'Need a professional plumber to fix a leaking pipe under the kitchen sink. The pipe has been dripping for two days and the cabinet is starting to warp.',
    budget: 250,
    status: 'pending',
    priority: 'high',
    createdAt: '2026-06-08T09:30:00Z',
    updatedAt: '2026-06-08T09:30:00Z',
    messages: 0,
  },
  {
    id: 'REQ-002',
    user: { name: 'Bob Smith', email: 'bob@example.com', image: '' },
    service: 'Electrical Wiring Installation',
    category: { label: 'Plumbing' },
    description:
      'Looking for an electrician to install new wiring for a home office setup. Need 4 new outlets and proper grounding.',
    budget: 450,
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-06-07T14:00:00Z',
    updatedAt: '2026-06-09T10:15:00Z',
    messages: 3,
  },
  {
    id: 'REQ-003',
    user: { name: 'Carol Davis', email: 'carol@example.com', image: '' },
    service: 'Garden Landscaping Design',
    category: { label: 'Plumbing' },
    description:
      'Want to redesign the front yard with drought-resistant plants and a small patio area. Modern minimalist style preferred.',
    budget: 1200,
    status: 'completed',
    priority: 'low',
    createdAt: '2026-06-01T11:00:00Z',
    updatedAt: '2026-06-09T08:00:00Z',
    messages: 8,
  },
  {
    id: 'REQ-004',
    user: { name: 'David Lee', email: 'david@example.com', image: '' },
    service: 'AC Repair & Maintenance',
    category: { label: 'Plumbing' },
    description:
      'AC unit is not cooling properly. It blows warm air and makes a strange noise. Model is a 3-ton split system from 2020.',
    budget: 350,
    status: 'rejected',
    priority: 'high',
    createdAt: '2026-06-06T16:45:00Z',
    updatedAt: '2026-06-07T09:00:00Z',
    messages: 2,
  },
  {
    id: 'REQ-005',
    user: { name: 'Emma Wilson', email: 'emma@example.com', image: '' },
    service: 'House Cleaning Service',
    category: { label: 'Plumbing' },
    description:
      'Need a deep cleaning service for a 3-bedroom apartment. Includes kitchen, bathrooms, windows, and carpets.',
    budget: 180,
    status: 'pending',
    priority: 'low',
    createdAt: '2026-06-09T07:00:00Z',
    updatedAt: '2026-06-09T07:00:00Z',
    messages: 0,
  },
  {
    id: 'REQ-006',
    user: { name: 'Frank Brown', email: 'frank@example.com', image: '' },
    service: 'Furniture Assembly',
    category: { label: 'Plumbing' },
    description:
      'Need help assembling an IKEA wardrobe (PAX series) and a bookshelf. All tools and parts are available.',
    budget: 120,
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-06-05T13:20:00Z',
    updatedAt: '2026-06-08T15:00:00Z',
    messages: 4,
  },
  {
    id: 'REQ-007',
    user: { name: 'Grace Kim', email: 'grace@example.com', image: '' },
    service: 'Painting & Wallpaper',
    category: { label: 'Plumbing' },
    description:
      'Want to paint the living room with a warm beige tone. Walls are currently white and in good condition.',
    budget: 600,
    status: 'completed',
    priority: 'low',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-06-02T16:30:00Z',
    messages: 5,
  },
  {
    id: 'REQ-008',
    user: { name: 'Henry Martinez', email: 'henry@example.com', image: '' },
    service: 'Emergency Lockout Service',
    category: { label: 'Plumbing' },
    description:
      'Locked out of my car in the downtown parking garage. Need urgent assistance to unlock the driver side door.',
    budget: 80,
    status: 'pending',
    priority: 'high',
    createdAt: '2026-06-09T08:30:00Z',
    updatedAt: '2026-06-09T08:30:00Z',
    messages: 0,
  },
  {
    id: 'REQ-009',
    user: { name: 'Ivy Chen', email: 'ivy@example.com', image: '' },
    service: 'Website Development',
    category: { label: 'Plumbing' },
    description:
      'Looking for a developer to build a small business website with 5 pages, contact form, and basic SEO optimization.',
    budget: 1500,
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-06-03T09:00:00Z',
    updatedAt: '2026-06-09T11:00:00Z',
    messages: 6,
  },
  {
    id: 'REQ-010',
    user: { name: 'Jack Taylor', email: 'jack@example.com', image: '' },
    service: 'Moving Services',
    category: { label: 'Plumbing' },
    description:
      'Need 2 movers for a 1-bedroom apartment move to a new location 5 miles away.',
    budget: 400,
    status: 'rejected',
    priority: 'medium',
    createdAt: '2026-06-04T12:00:00Z',
    updatedAt: '2026-06-05T10:00:00Z',
    messages: 1,
  },
];

const statusTabs = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
];

const categories = [
  'All Categories',
  'Plumbing',
  'Electrical',
  'Gardening',
  'HVAC',
  'Cleaning',
  'Assembly',
  'Home Improvement',
  'Locksmith',
  'Tech Support',
  'Moving',
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getStatusCount(requests: RequestItem[], status: string) {
  if (status === 'all') return requests.length;
  return requests.filter((r) => r.status === status).length;
}

const Requests = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(
    null
  );
  const [isLoading] = useState(false);
  // page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: manageRequests, isLoading: requestsLoading } =
    useManageRequestsQuery({
      status: statusFilter,
      currentPage,
      search,
    });

  console.log('checking manage requests data', manageRequests);

  // Total pages for pagination
  const totalPages: number = manageRequests?.pagination?.totalPages || 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleStatusChange = (id: string, newStatus: RequestItem['status']) => {
    const req = mockRequests.find((r) => r.id === id);
    if (req) {
      req.status = newStatus;
      req.updatedAt = new Date().toISOString();
    }
    setSelectedRequest((prev) =>
      prev && prev.id === id
        ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() }
        : prev
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Service Requests
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Track and manage all incoming service requests.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-gray-200 text-xs text-gray-500"
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setCategoryFilter('All Categories');
                setSortBy('newest');
              }}
            >
              <RefreshCw className="size-3.5" />
              Reset Filters
            </Button>
            <Badge
              variant="outline"
              className="h-8 gap-1.5 border-gray-200 px-3 text-xs font-medium text-gray-500"
            >
              <Calendar className="size-3.5" />
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Badge>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {[
            {
              label: 'Total',
              value: manageRequests?.kpiInfo?.totalRequests || 0,
              color: 'bg-gray-900',
              icon: FileText,
              bar: 'bg-gray-900',
            },
            {
              label: 'Pending',
              value: manageRequests?.kpiInfo?.totalPending || 0,
              color: 'bg-amber-500',
              icon: AlertCircle,
              bar: 'bg-amber-500',
            },
            {
              label: 'In Progress',
              value: manageRequests?.kpiInfo?.totalInProgress || 0,
              color: 'bg-blue-500',
              icon: Clock,
              bar: 'bg-blue-500',
            },
            {
              label: 'Completed',
              value: manageRequests?.kpiInfo?.totalCompleted || 0,
              color: 'bg-emerald-500',
              icon: CheckCircle2,
              bar: 'bg-emerald-500',
            },
            {
              label: 'Cancelled',
              value: manageRequests?.kpiInfo?.totalCancelled || 0,
              color: 'bg-red-500',
              icon: XCircle,
              bar: 'bg-red-500',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] ring-1 ring-gray-100 transition-all duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] hover:ring-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg text-white',
                    stat.color
                  )}
                >
                  <stat.icon className="size-4.5" />
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-gray-100">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    stat.bar
                  )}
                  style={{
                    width: `${manageRequests?.kpiInfo?.totalRequests ? (stat.value / manageRequests?.kpiInfo?.totalRequests) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] ring-1 ring-gray-100"
        >
          {/* Status Tabs */}
          <div className="flex gap-1 border-b border-gray-100 px-3 pt-3 pb-0 overflow-x-auto">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setStatusFilter(tab.value);
                }}
                className={cn(
                  'relative whitespace-nowrap rounded-t-lg px-3.5 py-2 text-xs font-medium transition-all',
                  statusFilter === tab.value
                    ? 'bg-white text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pink'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {tab.label}
                {/* {getStatusCount(manageRequests?.data, tab.value) > 0 && (
                  <span
                    className={cn(
                      'ml-1.5 inline-flex size-4 items-center justify-center rounded text-[9px] font-bold',
                      statusFilter === tab.value
                        ? 'bg-pink text-white'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {getStatusCount(manageRequests?.data, tab.value)}
                  </span>
                )} */}
              </button>
            ))}
          </div>

          {/* Search & Controls */}
          <div className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search requests..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="h-8 border-gray-200 pl-8 text-xs placeholder:text-gray-400 focus:border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={categoryFilter}
                onValueChange={(v: any) => {
                  setCategoryFilter(v);
                }}
              >
                <SelectTrigger
                  size="sm"
                  className="h-8 min-w-30 border-gray-200 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <Tag className="size-3 text-gray-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value ?? 'newest')}
              >
                <SelectTrigger
                  size="sm"
                  className="h-8 min-w-27.5 border-gray-200 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="size-3 text-gray-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="budget_high">Budget ↑</SelectItem>
                  <SelectItem value="budget_low">Budget ↓</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Table / List Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] ring-1 ring-gray-100 pb-5">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manageRequests?.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center">
                        <FileText className="mx-auto size-8 text-gray-300" />
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          No requests found
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          Try adjusting your search or filters.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    manageRequests?.data.map((req: any) => (
                      <TableRow key={req._id}>
                        <TableCell>
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="text-sm font-medium text-gray-900 transition-colors hover:text-pink"
                          >
                            {req.service}
                          </button>
                          <p className="mt-0.5 text-[11px] text-gray-400">
                            {req._id}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarImage
                                src={req.user.image}
                                alt={req.user.name}
                              />
                              <AvatarFallback className="bg-linear-to-br from-pink-400 to-purple-500 text-[9px] font-semibold text-white">
                                {getInitials(req.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 max-w-30">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {req.user.name}
                              </p>
                              <p className="truncate text-[11px] text-gray-400">
                                {req.user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600 ring-1 ring-gray-200">
                            {req.category?.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-semibold text-gray-900">
                            ${req.budget.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                              statusStyles[req.status]
                            )}
                          >
                            {req.status === 'in_progress'
                              ? 'In Progress'
                              : req.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500">
                            <Calendar className="size-3 shrink-0 text-gray-400" />
                            {formatDate(req.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setSelectedRequest(req)}
                            className="text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <Eye className="size-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden">
              {manageRequests?.data.length === 0 ? (
                <div className="flex flex-col items-center px-4 py-12">
                  <FileText className="size-8 text-gray-300" />
                  <p className="mt-2 text-sm font-medium text-gray-500">
                    No requests found
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {manageRequests?.data.map((req: any) => (
                    <div
                      key={req._id}
                      className="p-3 transition-colors hover:bg-gray-50/60"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <Avatar size="sm">
                            <AvatarImage
                              src={req.user.image}
                              alt={req.user.name}
                            />
                            <AvatarFallback className="bg-linear-to-br from-pink-400 to-purple-500 text-[9px] font-semibold text-white">
                              {getInitials(req.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <button
                              onClick={() => setSelectedRequest(req)}
                              className="truncate text-sm font-medium text-gray-900 transition-colors hover:text-pink"
                            >
                              {req.service}
                            </button>
                            <p className="truncate text-[11px] text-gray-400">
                              {req.user.name} · {req._id}
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset',
                            statusStyles[req.status]
                          )}
                        >
                          {req.status === 'in_progress'
                            ? 'In Progress'
                            : req.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Tag className="size-3 text-gray-400" />
                          {req.category?.label}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-gray-900">
                          <DollarSign className="size-3 text-gray-400" />$
                          {req.budget}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3 text-gray-400" />
                          {formatDate(req.createdAt)}
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-medium ring-1 ring-inset capitalize',
                            priorityStyles[req.priority]
                          )}
                        >
                          {req.priority}
                        </span>
                        {req.messages > 0 && (
                          <span className="inline-flex items-center gap-1 text-blue-500">
                            <MessageSquare className="size-3" />
                            {req.messages}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {manageRequests?.data.length > 0 && (
              <div className="w-full mt-6 flex items-center justify-end">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="w-30"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      />
                    </PaginationItem>

                    {pages.map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        className="w-22"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={(open) => {
          if (!open) setSelectedRequest(null);
        }}
      >
        <DialogContent className="sm:max-w-xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="text-base font-bold text-gray-900">
                      {selectedRequest.service}
                    </DialogTitle>
                    <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-400">
                      <span className="font-medium text-gray-500">
                        {selectedRequest.id}
                      </span>
                      <span className="size-1 rounded-full bg-gray-300" />
                      <span>{formatDate(selectedRequest.createdAt)}</span>
                      <span className="size-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {formatTimeAgo(selectedRequest.createdAt)}
                      </span>
                    </DialogDescription>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset capitalize',
                        statusStyles[selectedRequest.status]
                      )}
                    >
                      {selectedRequest.status === 'in_progress'
                        ? 'In Progress'
                        : selectedRequest.status}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset capitalize',
                        priorityStyles[selectedRequest.priority]
                      )}
                    >
                      {selectedRequest.priority}
                    </span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 px-5 py-3">
                {/* Customer + Budget Row */}
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 ring-1 ring-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarImage
                        src={selectedRequest.user.image}
                        alt={selectedRequest.user.name}
                      />
                      <AvatarFallback className="bg-linear-to-br from-pink-400 to-purple-500 text-[10px] font-semibold text-white">
                        {getInitials(selectedRequest.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedRequest.user.name}
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Mail className="size-3" />
                        {selectedRequest.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Budget
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      ${selectedRequest.budget.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-gray-100 bg-white p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Category
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {selectedRequest.category?.label}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-white p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Messages
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {selectedRequest.messages} messages
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    Description
                  </p>
                  <div className="rounded-lg border border-gray-100 bg-white p-3">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {selectedRequest.description}
                    </p>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    Activity
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white p-2.5">
                      <div className="flex size-7 items-center justify-center rounded-full bg-blue-50">
                        <ArrowUpRight className="size-3.5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">
                          Request Created
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {formatDate(selectedRequest.createdAt)}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {formatTimeAgo(selectedRequest.createdAt)}
                      </span>
                    </div>
                    {selectedRequest.status !== 'pending' && (
                      <div className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white p-2.5">
                        <div
                          className={cn(
                            'flex size-7 items-center justify-center rounded-full',
                            selectedRequest.status === 'completed'
                              ? 'bg-emerald-50'
                              : selectedRequest.status === 'in_progress'
                                ? 'bg-amber-50'
                                : 'bg-red-50'
                          )}
                        >
                          {selectedRequest.status === 'completed' ? (
                            <CheckCircle2 className="size-3.5 text-emerald-500" />
                          ) : selectedRequest.status === 'in_progress' ? (
                            <Clock className="size-3.5 text-amber-500" />
                          ) : (
                            <XCircle className="size-3.5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-900 capitalize">
                            {selectedRequest.status === 'in_progress'
                              ? 'Marked In Progress'
                              : selectedRequest.status}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {formatDate(selectedRequest.updatedAt)}
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {formatTimeAgo(selectedRequest.updatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col-reverse gap-2 border-t border-gray-100 px-5 py-3 sm:flex-row sm:justify-between">
                <Badge
                  variant="outline"
                  className="border-gray-200 text-[11px] text-gray-500"
                >
                  <User className="mr-1 size-3" />
                  {selectedRequest.user.name}
                </Badge>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedRequest.status !== 'in_progress' && (
                    <Button
                      size="sm"
                      className="h-7 bg-blue-500 px-2.5 text-[11px] text-white hover:bg-blue-600"
                      onClick={() =>
                        handleStatusChange(selectedRequest.id, 'in_progress')
                      }
                    >
                      <Clock className="mr-1 size-3" />
                      In Progress
                    </Button>
                  )}
                  {selectedRequest.status !== 'completed' && (
                    <Button
                      size="sm"
                      className="h-7 bg-emerald-500 px-2.5 text-[11px] text-white hover:bg-emerald-600"
                      onClick={() =>
                        handleStatusChange(selectedRequest.id, 'completed')
                      }
                    >
                      <CheckCircle2 className="mr-1 size-3" />
                      Complete
                    </Button>
                  )}
                  {selectedRequest.status !== 'rejected' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 border-red-200 px-2.5 text-[11px] text-red-500 hover:bg-red-50"
                      onClick={() =>
                        handleStatusChange(selectedRequest.id, 'rejected')
                      }
                    >
                      <XCircle className="mr-1 size-3" />
                      Reject
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Requests;
