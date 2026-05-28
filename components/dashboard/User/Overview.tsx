'use client';
import { LucideDollarSign } from 'lucide-react';
import { FaTools } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';
import { RiMobileDownloadFill } from 'react-icons/ri';
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
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Overview = () => {
  // Monthly budget data for bar chart
  const monthlyData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2000 },
    { month: 'Apr', amount: 2780 },
    { month: 'May', amount: 1890 },
    { month: 'Jun', amount: 2390 },
    { month: 'Jul', amount: 3490 },
  ];

  // Category distribution data for pie chart
  const categoryData = [
    { name: 'Plumbing', value: 45 },
    { name: 'Electrical', value: 30 },
    { name: 'Cleaning', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#EC4899', '#A855F7', '#6366F1', '#8B5CF6'];

  // KPI Cards Data
  const kpiCards = [
    {
      id: 1,
      label: 'Total Requests',
      value: '24',
      icon: <FaCodePullRequest />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      id: 2,
      label: 'Active Jobs',
      value: '+2%',
      icon: <FaTools />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      id: 3,
      label: 'Budget Summary',
      value: '$3,400',
      icon: <LucideDollarSign />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      id: 4,
      label: 'Pending Orders',
      value: '8',
      icon: <RiMobileDownloadFill />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((card) => (
          <div
            key={card.id}
            className={`bg-[#FFFFFF] rounded-lg p-6 shadow-sm`}
          >
            <div
              className={`${card.bgColor} w-14 h-14 flex items-center justify-center rounded-2xl mb-3`}
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{card.label}</p>
            <p className={`text-2xl font-bold mt-2 `}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Budget Insights */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Monthly Budget Insights
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              March (Budget: 3 last - Days)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="amount" fill="#cc1652" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Category Distribution
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 space-y-2">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
                <span className="text-sm font-semibold text-gray-900 ml-auto">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
