'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  CalendarDays,
  User,
  Search,
  Receipt,
  Hash,
  Copy,
  Landmark,
} from 'lucide-react';
import { FaUsers } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useManagePaymentsQuery } from '@/state/services/admin/AdminService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  paid: {
    label: 'Paid',
    icon: <CheckCircle2 className="size-3.5" />,
    className: 'bg-emerald-50 text-emerald-700',
  },
  pending: {
    label: 'Pending',
    icon: <Clock className="size-3.5" />,
    className: 'bg-amber-50 text-amber-700',
  },
  failed: {
    label: 'Failed',
    icon: <AlertCircle className="size-3.5" />,
    className: 'bg-red-50 text-red-700',
  },
  cancelled: {
    label: 'Cancelled',
    icon: <AlertCircle className="size-3.5" />,
    className: 'bg-gray-100 text-gray-700',
  },
};

const statusFilters = [
  'all',
  'paid',
  'pending',
  'failed',
  'cancelled',
] as const;

const AdminPayments = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const { data: payments, isLoading } = useManagePaymentsQuery({
    search,
    status: statusFilter,
    currentPage,
  });
  console.log('chekcing payments data', payments);
  const list = payments?.data || [];
  const totalPages = payments?.pagination?.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderStatus = (status: string) => {
    const cfg = statusConfig[status] || {
      label: status,
      icon: <AlertCircle className="size-3.5" />,
      className: 'bg-gray-100 text-gray-700',
    };
    return (
      <Badge
        variant="outline"
        className={cn(
          'gap-1.5 px-3 py-1 rounded-full text-xs font-medium border-0 whitespace-nowrap',
          cfg.className
        )}
      >
        {cfg.icon}
        {cfg.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor all platform transactions and payment activity.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Total Revenue',
                value: `৳${payments?.kpiInfo?.totalRevenue?.[0]?.total || 0}`,
                color: 'text-gray-900',
                bg: 'bg-gray-50',
                icon: <Landmark className="size-4 text-gray-500" />,
              },
              {
                label: 'Paid',
                value: payments?.kpiInfo?.totalPaid || 0,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                icon: <CheckCircle2 className="size-4 text-emerald-500" />,
              },
              {
                label: 'Pending',
                value: payments?.kpiInfo?.totalPending || 0,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
                icon: <Clock className="size-4 text-amber-500" />,
              },
              {
                label: 'Failed',
                value: payments?.kpiInfo?.totalFailed || 0,
                color: 'text-red-600',
                bg: 'bg-red-50',
                icon: <AlertCircle className="size-4 text-red-500" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5',
                  stat.bg
                )}
              >
                <span className="text-sm">{stat.icon}</span>
                <div>
                  <p
                    className={cn('text-lg font-bold leading-none', stat.color)}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by service, client, provider, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg w-fit">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap',
                    statusFilter === status
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {status === 'all'
                    ? 'All'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-44 bg-gray-200" />
                    <Skeleton className="h-3 w-60 bg-gray-200" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && list.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-xs border border-gray-100/50 text-center">
            <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Receipt className="size-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">
              {search || statusFilter !== 'all'
                ? 'No payments match your filters'
                : 'No payments yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {search || statusFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Payments will appear here once users complete transactions'}
            </p>
          </div>
        )}

        {/* Payments Table (Desktop) */}
        {!isLoading && list.length > 0 && (
          <div className="hidden md:block bg-white rounded-2xl shadow-xs border border-gray-100/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                    <th className="px-4 py-3.5 font-medium w-[26%]">Service</th>
                    <th className="px-4 py-3.5 font-medium w-[15%]">Client</th>
                    <th className="px-4 py-3.5 font-medium w-[15%]">
                      Provider
                    </th>
                    <th className="px-4 py-3.5 font-medium w-[10%]">Amount</th>
                    <th className="px-4 py-3.5 font-medium w-[16%]">
                      Transaction
                    </th>
                    <th className="px-4 py-3.5 font-medium w-[10%]">Date</th>
                    <th className="px-4 py-3.5 font-medium w-[8%]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((payment: any) => (
                    <tr
                      key={payment._id}
                      className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                            <Image
                              src={payment?.request?.image}
                              alt={payment?.request?.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <span className="font-medium text-gray-900 text-sm truncate min-w-0">
                            {payment?.request?.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                          <User className="size-3.5 shrink-0 text-gray-400" />
                          <span className="truncate min-w-0">
                            {payment?.user?.name ||
                              payment?.userId?.name ||
                              '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                          <FaUsers className="size-3.5 shrink-0 text-gray-400" />
                          <span className="truncate min-w-0">
                            {payment?.provider?.user?.name ||
                              payment?.providerId?.user?.name ||
                              '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-gray-900 truncate">
                        ৳{payment.amount?.toLocaleString() || payment.amount}
                      </td>
                      <td className="px-4 py-3.5">
                        {payment.transactionId ? (
                          <button
                            onClick={() =>
                              copyToClipboard(payment.transactionId)
                            }
                            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md hover:bg-gray-200 transition cursor-pointer truncate max-w-full"
                          >
                            <span className="truncate min-w-0">
                              {payment.transactionId}
                            </span>
                            {copiedId === payment.transactionId ? (
                              <CheckCircle2 className="size-3 text-green-500 shrink-0" />
                            ) : (
                              <Copy className="size-3 shrink-0" />
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <CalendarDays className="size-3.5 text-gray-400 shrink-0" />
                          <span className="truncate min-w-0">
                            {formatDate(payment.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {renderStatus(payment.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination className="py-3 border-t border-gray-100">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            <div className="px-4 py-2.5 border-t bg-gray-50/50 text-[11px] text-gray-400 flex items-center gap-1">
              <Hash className="size-3" />
              Payment IDs:
              {list.map((p: any) => (
                <button
                  key={p._id}
                  onClick={() => copyToClipboard(p._id)}
                  className="font-mono hover:text-gray-700 transition cursor-pointer ml-1.5"
                  title="Click to copy"
                >
                  {p._id}
                  {copiedId === p._id && (
                    <span className="text-green-500 ml-0.5">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Payments Cards (Mobile) */}
        {!isLoading && list.length > 0 && (
          <div className="md:hidden space-y-3">
            {list.map((payment: any) => (
              <div
                key={payment._id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="size-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    <Image
                      src={payment?.request?.image}
                      alt={payment?.request?.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                      {payment?.request?.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="size-3" />
                        {payment?.user?.name || payment?.userId?.name || '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers className="size-3" />
                        {payment?.provider?.user?.name ||
                          payment?.providerId?.user?.name ||
                          '—'}
                      </span>
                    </div>
                    {renderStatus(payment.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-sm">
                  <div>
                    <p className="text-[11px] text-gray-400">Amount</p>
                    <p className="font-bold text-gray-900">
                      ৳{payment.amount?.toLocaleString() || payment.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Transaction</p>
                    <p className="font-mono text-xs truncate text-gray-600">
                      {payment.transactionId || (
                        <span className="text-gray-400 italic">Pending</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Date</p>
                    <p className="text-gray-600">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Payment ID</p>
                    <button
                      onClick={() => copyToClipboard(payment._id)}
                      className="font-mono text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Hash className="size-3" />
                      {payment._id}
                      {copiedId === payment._id ? (
                        <CheckCircle2 className="size-3 text-green-500" />
                      ) : (
                        <Copy className="size-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <Pagination className="py-3">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
