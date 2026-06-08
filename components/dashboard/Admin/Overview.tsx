'use client';

import {
  LucideDollarSign,
  LucideUserCheck,
  LucideClipboardList,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { FaUsers } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { useOverviewInfoQuery } from '@/state/services/admin/AdminService';

const monthlySignups = [
  { month: 'Jan', users: 120, providers: 45 },
  { month: 'Feb', users: 180, providers: 62 },
  { month: 'Mar', users: 240, providers: 78 },
  { month: 'Apr', users: 190, providers: 55 },
  { month: 'May', users: 310, providers: 90 },
  { month: 'Jun', users: 280, providers: 85 },
  { month: 'Jul', users: 350, providers: 110 },
];

const revenueData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 18000 },
  { month: 'Mar', amount: 24000 },
  { month: 'Apr', amount: 19000 },
  { month: 'May', amount: 31000 },
  { month: 'Jun', amount: 28000 },
  { month: 'Jul', amount: 35000 },
];

const categoryData = [
  { name: 'Plumbing', value: 35 },
  { name: 'Electrical', value: 28 },
  { name: 'Cleaning', value: 20 },
  { name: 'Other', value: 17 },
];

const COLORS = ['#F72585', '#A855F7', '#6366F1', '#EC4899'];

const recentUsers = [
  {
    id: '#USR-001',
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    role: 'user',
    status: 'active' as const,
    joined: '2026-06-01',
  },
  {
    id: '#USR-002',
    name: 'Priya Das',
    email: 'priya@email.com',
    role: 'provider',
    status: 'active' as const,
    joined: '2026-05-28',
  },
  {
    id: '#USR-003',
    name: 'Amit Khan',
    email: 'amit@email.com',
    role: 'user',
    status: 'suspended' as const,
    joined: '2026-05-25',
  },
  {
    id: '#USR-004',
    name: 'Sneha Roy',
    email: 'sneha@email.com',
    role: 'provider',
    status: 'active' as const,
    joined: '2026-05-22',
  },
  {
    id: '#USR-005',
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    role: 'user',
    status: 'pending' as const,
    joined: '2026-05-20',
  },
];

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  suspended: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
};

const roleStyles: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-600',
  provider: 'bg-blue-50 text-blue-600',
  user: 'bg-gray-100 text-gray-600',
};

const Overview = () => {
  const { data: OverviewInfo, isLoading: overviewLoading } =
    useOverviewInfoQuery();

  console.log('checking overview info', OverviewInfo?.recentUsers);

  const kpiCards = [
    {
      id: 1,
      label: 'Total Users',
      value: OverviewInfo?.totalUsers || 0,
      icon: <FaUsers />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      trendUp: true,
    },
    {
      id: 2,
      label: 'Total Providers',
      value: OverviewInfo?.totalProviders || 0,
      icon: <LucideUserCheck />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+8%',
      trendUp: true,
    },
    {
      id: 3,
      label: 'Total Requests',
      value: OverviewInfo?.totalRequests || 0,
      icon: <LucideClipboardList />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      trend: '+15%',
      trendUp: true,
    },
    {
      id: 4,
      label: 'Total Revenue',
      value: `$${OverviewInfo?.totalRevenue[0].total || 0}`,
      icon: <LucideDollarSign />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+23%',
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/50">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                Monitor platform activity, users, and revenue at a glance.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-full">
              <span className="size-2 rounded-full bg-[#E91E63] animate-pulse" />
              <span className="text-xs font-medium text-pink-600">Live</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!overviewLoading
            ? kpiCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100/50 hover:shadow-md hover:border-gray-200/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`${card.bgColor} size-12 flex items-center justify-center rounded-xl`}
                    >
                      <span className={`text-lg ${card.textColor}`}>
                        {card.icon}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full',
                        card.trendUp
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-600'
                      )}
                    >
                      <FiTrendingUp className="size-3" />
                      {card.trend}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {card.value}
                  </p>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100/50"
                >
                  <Skeleton className="size-12 rounded-xl bg-gray-100 mb-4" />
                  <Skeleton className="h-3 w-20 bg-gray-100 mb-2" />
                  <Skeleton className="h-7 w-24 bg-gray-100" />
                </div>
              ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Monthly Signups */}
          {!overviewLoading ? (
            <Card className="border-0 shadow-xs lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Signups</CardTitle>
                <p className="text-xs text-gray-500">
                  New users & providers over the last 7 months
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={OverviewInfo?.monthlySignups}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '13px',
                      }}
                    />
                    <Bar dataKey="users" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    <Bar
                      dataKey="providers"
                      fill="#F72585"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xs lg:col-span-2">
              <CardContent className="p-6">
                <Skeleton className="h-87.5 w-full bg-gray-200" />
              </CardContent>
            </Card>
          )}

          {/* Revenue Chart */}
          {!overviewLoading ? (
            <Card className="border-0 shadow-xs">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <p className="text-xs text-gray-500">
                  Total revenue over the last 7 months
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={OverviewInfo?.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '13px',
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#6366F1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xs">
              <CardContent className="p-6">
                <Skeleton className="h-75 w-full bg-gray-200" />
              </CardContent>
            </Card>
          )}

          {/* Service Categories */}
          {!overviewLoading ? (
            <Card className="border-0 shadow-xs">
              <CardHeader>
                <CardTitle>Service Categories</CardTitle>
                <p className="text-xs text-gray-500">
                  Distribution of all services
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={OverviewInfo?.categoryStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2.5">
                  {OverviewInfo?.categoryStats.map((cat: any, i: number) => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-sm text-gray-600">{cat.name}</span>
                      <span className="ml-auto text-sm font-semibold text-gray-900">
                        {cat.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xs">
              <CardContent className="p-6">
                <Skeleton className="h-75 w-full bg-gray-200" />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Users */}
        <Card className="border-0 shadow-xs">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <p className="text-xs text-gray-500">
              Latest registered users and providers on the platform
            </p>
          </CardHeader>
          <CardContent className="p-0 sm:px-4 sm:pb-4">
            {!overviewLoading ? (
              <>
                {/* Mobile Cards */}
                <div className="divide-y divide-gray-100 sm:hidden">
                  {OverviewInfo?.recentUsers &&
                    OverviewInfo?.recentUsers.map((user: any) => (
                      <div key={user.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                              {user?.image ? (
                                <img
                                  className="rounded-full"
                                  src={user?.image}
                                />
                              ) : (
                                user.name
                                  .split(' ')
                                  .map((n: any) => n[0])
                                  .join('')
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {user.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              'border px-2 py-0.5 text-xs font-medium capitalize',
                              roleStyles[user.role]
                            )}
                          >
                            {user.role}
                          </Badge>
                          <Badge
                            className={cn(
                              'border px-2 py-0.5 text-xs font-medium capitalize',
                              statusStyles[user.status]
                            )}
                          >
                            {user.status}
                          </Badge>
                          <span className="ml-auto text-xs text-gray-400">
                            {new Date(user.createdAt).toDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OverviewInfo?.recentUsers.map((user: any) => (
                        <tr
                          key={user._id}
                          className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-3.5 font-medium text-gray-900">
                            {user._id}
                          </td>
                          <td className="px-4 py-3.5 text-gray-700">
                            <div className="flex items-center gap-2.5">
                              <div className="size-8 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                {user?.image ? (
                                  <img
                                    className="rounded-full"
                                    src={user?.image}
                                  />
                                ) : (
                                  user.name
                                    .split(' ')
                                    .map((n: any) => n[0])
                                    .join('')
                                )}
                              </div>
                              <span className="font-medium text-gray-900">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={cn(
                                'border px-2 py-0.5 text-xs font-medium capitalize',
                                roleStyles[user.role]
                              )}
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={cn(
                                'border px-2 py-0.5 text-xs font-medium capitalize',
                                statusStyles[user.status]
                              )}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5 text-gray-500">
                            {new Date(user.createdAt).toDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="p-4 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="size-10 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40 bg-gray-200" />
                      <Skeleton className="h-3 w-56 bg-gray-200" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
