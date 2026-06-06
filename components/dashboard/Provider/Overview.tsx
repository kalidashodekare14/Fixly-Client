'use client';

import { LucideDollarSign } from 'lucide-react';
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
import { FaStar, FaToolbox } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import { MdPending, MdTaskAlt } from 'react-icons/md';
import { useOverviewInfoQuery } from '@/state/services/provider/RequestService';

const monthlyEarnings = [
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 2800 },
  { month: 'Mar', amount: 4200 },
  { month: 'Apr', amount: 3800 },
  { month: 'May', amount: 5100 },
  { month: 'Jun', amount: 4600 },
  { month: 'Jul', amount: 4900 },
];

const categoryData = [
  { name: 'Plumbing', value: 35 },
  { name: 'Electrical', value: 28 },
  { name: 'Cleaning', value: 20 },
  { name: 'Other', value: 17 },
];

const COLORS = ['#F72585', '#A855F7', '#6366F1', '#EC4899'];

const recentRequests = [
  {
    id: '#REQ-1024',
    client: 'Rahul Sharma',
    service: 'AC Repair',
    date: '2026-05-28',
    status: 'urgent' as const,
    budget: '$120',
  },
  {
    id: '#REQ-1023',
    client: 'Priya Das',
    service: 'Plumbing',
    date: '2026-05-27',
    status: 'pending' as const,
    budget: '$80',
  },
  {
    id: '#REQ-1022',
    client: 'Amit Khan',
    service: 'Electrical Wiring',
    date: '2026-05-26',
    status: 'pending' as const,
    budget: '$200',
  },
  {
    id: '#REQ-1021',
    client: 'Sneha Roy',
    service: 'Deep Cleaning',
    date: '2026-05-25',
    status: 'completed' as const,
    budget: '$150',
  },
];

const statusStyles: Record<string, string> = {
  urgent: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

const Overview = () => {
  const { data: overviewInfo, isLoading: overviewLoading } =
    useOverviewInfoQuery();

  console.log('checking overview data', overviewInfo);

  // KPI Cards Data
  const kpiCards = [
    {
      id: 1,
      label: 'Active Jobs',
      value: overviewInfo?.completedJobs || 0,
      icon: <FaToolbox />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      id: 2,
      label: 'Total Earnings',
      value: `$${overviewInfo?.completedEarnings?.total || 0}`,
      icon: <LucideDollarSign />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      id: 3,
      label: 'Completed Jobs',
      value: overviewInfo?.completedJobs || 0,
      icon: <MdTaskAlt />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      id: 4,
      label: 'Pending Requests',
      value: overviewInfo?.pendingRequests || 0,
      icon: <MdPending />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, Amir
                </h1>
                <p className="text-sm text-charcoal mt-2">
                  You have 3 active tasks needing your attention today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {!overviewLoading &&
            kpiCards.map((card) => (
              <div
                key={card.id}
                className={`bg-[#FFFFFF] rounded-lg p-6 shadow-sm`}
              >
                <div
                  className={`${card.bgColor} w-14 h-14 flex items-center justify-center rounded-2xl mb-3`}
                >
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  {card.label}
                </p>
                <p className={`text-2xl font-bold mt-2 `}>{card.value}</p>
              </div>
            ))}

          {overviewLoading &&
            Array.from({ length: 4 }).map((_, id) => (
              <div>
                <Skeleton className="h-40 w-full lg:w-60 bg-gray-200 border border-gray-300" />
              </div>
            ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Monthly Earnings */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <p className="text-xs text-gray-500">
                Total earnings over the last 7 months
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overviewInfo?.monthlyEarnings}>
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
                  <Bar dataKey="amount" fill="#F72585" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Categories */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
              <p className="text-xs text-gray-500">
                Distribution of your services
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={overviewInfo?.categoryStats}
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
                {overviewInfo?.categoryStats?.map((cat: any, i: number) => (
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
        </div>

        {/* Recent Incoming Requests */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Incoming Requests</CardTitle>
            <p className="text-xs text-gray-500">
              Latest service requests from clients
            </p>
          </CardHeader>
          <CardContent className="p-0 sm:px-4 sm:pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                    <th className="px-4 py-3 font-medium sm:px-0">ID</th>
                    <th className="px-4 py-3 font-medium sm:px-0">Client</th>
                    <th className="px-4 py-3 font-medium sm:px-0">Service</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell sm:px-0">
                      Date
                    </th>
                    <th className="px-4 py-3 font-medium sm:px-0">Status</th>
                    <th className="px-4 py-3 font-medium sm:px-0">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-3.5 font-medium text-gray-900 sm:px-0">
                        {req.id}
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 sm:px-0">
                        {req.client}
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 sm:px-0">
                        {req.service}
                      </td>
                      <td className="hidden px-4 py-3.5 text-gray-500 sm:table-cell sm:px-0">
                        {req.date}
                      </td>
                      <td className="px-4 py-3.5 sm:px-0">
                        <Badge
                          className={cn(
                            'border px-2 py-0.5 text-xs font-medium capitalize',
                            statusStyles[req.status]
                          )}
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 font-medium text-gray-900 sm:px-0">
                        {req.budget}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
