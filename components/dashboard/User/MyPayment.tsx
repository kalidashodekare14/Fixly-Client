'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Receipt,
  Banknote,
  CheckCircle2,
  Clock,
  AlertCircle,
  CalendarDays,
  Hash,
  User,
  Copy,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMyPaymentsQuery } from '@/state/services/user/RequestService';

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; class: string }
> = {
  paid: {
    label: 'Paid',
    icon: <CheckCircle2 className="size-3.5" />,
    class: 'bg-green-100 text-green-700',
  },
  pending: {
    label: 'Pending',
    icon: <AlertCircle className="size-3.5" />,
    class: 'bg-yellow-100 text-yellow-700',
  },
  faild: {
    label: 'Cancelled',
    icon: <AlertCircle className="size-3.5" />,
    class: 'bg-red-100 text-red-700',
  },
};

const statusFilters = ['all', 'paid', 'pending', 'faild'] as const;

const MyPayment = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: payments, isLoading } = useMyPaymentsQuery({
    search: search,
    status: statusFilter,
  });
  console.log('checking payment data', payments);

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

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold">My Payments</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage your service payments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            {isLoading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-7 w-24" />
                </div>
                <Skeleton className="size-11 rounded-2xl" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold mt-1.5">
                    ৳{payments?.kpiInfo?.totalSpent[0]?.total || 0}
                  </p>
                </div>
                <div className="size-11 rounded-2xl bg-green-50 flex items-center justify-center">
                  <Banknote className="size-5 text-green-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            {isLoading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-20" />
                </div>
                <Skeleton className="size-11 rounded-2xl" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Paid
                  </p>
                  <p className="text-2xl font-bold mt-1.5">
                    {payments?.kpiInfo?.totalPaid || 0}
                  </p>
                </div>
                <div className="size-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-blue-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            {isLoading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-20" />
                </div>
                <Skeleton className="size-11 rounded-2xl" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pending
                  </p>
                  <p className="text-2xl font-bold mt-1.5">
                    {payments?.kpiInfo?.totalPending || 0}
                  </p>
                </div>
                <div className="size-11 rounded-2xl bg-yellow-50 flex items-center justify-center">
                  <Clock className="size-5 text-yellow-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            {isLoading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-7 w-20" />
                </div>
                <Skeleton className="size-11 rounded-2xl" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cancelled
                  </p>
                  <p className="text-2xl font-bold mt-1.5">
                    {payments?.kpiInfo?.totalFailed || 0}
                  </p>
                </div>
                <div className="size-11 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <Receipt className="size-5 text-purple-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl border shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Search by service, provider, or transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition cursor-pointer ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
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
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <Skeleton className="size-14 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && payments?.paymentInfo.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <Receipt className="size-10 text-gray-300" />
          </div>
          <p className="text-base font-medium text-gray-600">
            {search || statusFilter !== 'all'
              ? 'No payments match your filters'
              : 'No payments yet'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {search || statusFilter !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Your payment history will appear here after you pay for a service'}
          </p>
        </div>
      )}

      {/* Payments Table (Desktop) */}
      {!isLoading && payments?.paymentInfo.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service & Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.paymentInfo.map((payment: any) => {
                const cfg =
                  statusConfig[payment.status] || statusConfig.pending;
                return (
                  <TableRow key={payment._id}>
                    <TableCell>
                      <div className="flex items-center gap-3 max-w-56">
                        <div className="size-11 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                          <Image
                            src={payment?.request?.image}
                            alt={payment?.request?.title}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {payment?.request?.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <User className="size-3 shrink-0" />
                            <span className="truncate">
                              {payment?.provider?.user?.name}
                            </span>
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">
                      ৳{payment.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {payment.transactionId ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                            {payment.transactionId}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(payment.transactionId)
                            }
                            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                          >
                            {copiedId === payment.transactionId ? (
                              <CheckCircle2 className="size-3.5 text-green-500" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {payment.createdAt ? (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="size-3.5" />
                          {formatDate(payment.createdAt)}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`gap-1.5 px-3 py-1 rounded-full text-xs font-medium border-0 whitespace-nowrap ${cfg.class}`}
                      >
                        {cfg.icon}
                        {cfg.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="px-4 py-2.5 border-t bg-gray-50/50 text-[11px] text-gray-400 flex items-center gap-1">
            <Hash className="size-3" />
            Request IDs:
            {payments?.paymentInfo.map((p: any) => (
              <button
                key={p._id}
                onClick={() => copyToClipboard(p.request?._id || p._id)}
                className="font-mono hover:text-gray-700 transition cursor-pointer ml-1.5"
                title="Click to copy"
              >
                {p.request?._id || p._id}
                {copiedId === (p.request?._id || p._id) && (
                  <span className="text-green-500 ml-0.5">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Payments Cards (Mobile) */}
      {!isLoading && payments?.paymentInfo.length > 0 && (
        <div className="md:hidden space-y-4">
          {payments?.paymentInfo.map((payment: any) => {
            const cfg = statusConfig[payment.status] || statusConfig.pending;
            return (
              <div
                key={payment._id}
                className="bg-white border rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
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
                      <h3 className="font-semibold text-sm line-clamp-1">
                        {payment?.request?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <User className="size-3" />
                        {payment?.provider?.user?.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge
                          variant="outline"
                          className={`gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border-0 ${cfg.class}`}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-100 text-sm">
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Amount
                      </p>
                      <p className="font-bold">
                        ৳{payment.amount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Transaction ID
                      </p>
                      <p className="font-mono text-xs truncate">
                        {payment.transactionId || (
                          <span className="text-gray-400 italic">Pending</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Payment Date
                      </p>
                      <p>{formatDate(payment.createdAt)}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[11px] text-muted-foreground">
                        Request ID
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(payment.request?._id || payment._id)
                        }
                        className="font-mono text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Hash className="size-3" />
                        {payment.request?._id || payment._id}
                        {copiedId === (payment.request?._id || payment._id) ? (
                          <CheckCircle2 className="size-3 text-green-500" />
                        ) : (
                          <Copy className="size-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPayment;
