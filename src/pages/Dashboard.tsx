import { useEffect, useState } from 'react';
import {
  Users,
  FileText,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data - replace with real API calls
const statsData = [
  { label: 'Total Clients', value: 127, change: '+12%', icon: Users, trend: 'up', color: 'bg-blue-500' },
  { label: 'Documents', value: 2847, change: '+23%', icon: FileText, trend: 'up', color: 'bg-green-500' },
  { label: 'Pending Tasks', value: 18, change: '-5%', icon: Clock, trend: 'down', color: 'bg-yellow-500' },
  { label: 'Urgent Items', value: 3, change: '+2', icon: AlertCircle, trend: 'up', color: 'bg-red-500' },
];

const uploadTrendData = [
  { name: 'Mon', documents: 45 },
  { name: 'Tue', documents: 52 },
  { name: 'Wed', documents: 48 },
  { name: 'Thu', documents: 61 },
  { name: 'Fri', documents: 55 },
  { name: 'Sat', documents: 28 },
  { name: 'Sun', documents: 32 },
];

const documentTypeData = [
  { name: 'Invoices', count: 842 },
  { name: 'GST', count: 456 },
  { name: 'TDS', count: 321 },
  { name: 'Bank Stmt', count: 289 },
  { name: 'Audit', count: 167 },
  { name: 'Other', count: 772 },
];

const recentClients = [
  { name: 'Acme Corp', phone: '+91 98765 43210', files: 24, lastUpload: '2 hours ago', status: 'active' },
  { name: 'Tech Solutions Ltd', phone: '+91 98765 43211', files: 18, lastUpload: '5 hours ago', status: 'active' },
  { name: 'Global Enterprises', phone: '+91 98765 43212', files: 32, lastUpload: '1 day ago', status: 'inactive' },
  { name: 'Smart Industries', phone: '+91 98765 43213', files: 15, lastUpload: '2 days ago', status: 'active' },
  { name: 'Future Systems', phone: '+91 98765 43214', files: 28, lastUpload: '3 days ago', status: 'warning' },
];

const aiInsights = [
  '3 clients haven\'t submitted TDS certificates for Q3 2024',
  'Invoice submission rate increased by 23% this week',
  '5 clients are approaching ITR filing deadline (15 days)',
  'Bank statement collection is 89% complete for this month',
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="w-4 h-4" />
          <span>Last updated: {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-6 h-6" />
          <h2 className="text-xl font-bold">AI-Powered Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, index) => (
            <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
              {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Document Upload Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={uploadTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="documents" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Document Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Documents by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={documentTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Client Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Upload
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentClients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {client.files} files
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {client.lastUpload}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
