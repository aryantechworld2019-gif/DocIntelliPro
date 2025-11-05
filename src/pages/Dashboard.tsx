import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  Clock,
  AlertCircle,
  Activity,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { dashboardAPI } from '../api/dashboard.api';
import { geminiAPI } from '../api/gemini.api';
import StatsCard from '../components/dashboard/StatsCard';
import ClientCard from '../components/dashboard/ClientCard';
import ChartCard from '../components/dashboard/ChartCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardAPI.getStats(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch client summaries
  const { data: clientSummaries, isLoading: clientsLoading } = useQuery({
    queryKey: ['client-summaries'],
    queryFn: () => dashboardAPI.getClientSummaries(5),
    refetchInterval: 60000, // Refetch every minute
  });

  // Fetch document counts by type
  const { data: documentCounts, isLoading: documentsLoading } = useQuery({
    queryKey: ['document-counts'],
    queryFn: () => dashboardAPI.getDocumentCountsByType(),
  });

  // Fetch upload trends
  const { data: uploadTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['upload-trends'],
    queryFn: () => dashboardAPI.getUploadTrends(7),
  });

  // Fetch AI insights
  const { data: aiInsights } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: async () => {
      try {
        // Prepare data for AI analysis
        const [clients, documents, tasks] = await Promise.all([
          dashboardAPI.getClientSummaries(),
          dashboardAPI.getDocumentCountsByType(),
          dashboardAPI.getStats(),
        ]);

        // Generate insights using Gemini
        return await geminiAPI.generateInsights({
          clients: clients as any[],
          documents: documents as any[],
          tasks: [{ status: 'pending' }] as any[],
        });
      } catch (error) {
        console.error('Error generating AI insights:', error);
        return [
          'Upload activity is looking good this week!',
          'Consider following up with inactive clients',
          'All critical documents are being tracked',
        ];
      }
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Prepare stats data
  const statsData = stats
    ? [
        {
          label: 'Total Clients',
          value: stats.totalClients,
          change: stats.clientsChange,
          icon: Users,
          trend: 'up' as const,
          color: 'bg-blue-500',
        },
        {
          label: 'Documents',
          value: stats.totalDocuments,
          change: stats.documentsChange,
          icon: FileText,
          trend: 'up' as const,
          color: 'bg-green-500',
        },
        {
          label: 'Pending Tasks',
          value: stats.pendingTasks,
          change: stats.tasksChange,
          icon: Clock,
          trend: stats.tasksChange.startsWith('-') ? ('up' as const) : ('down' as const),
          color: 'bg-yellow-500',
        },
        {
          label: 'Urgent Items',
          value: stats.urgentItems,
          change: stats.urgentChange,
          icon: AlertCircle,
          trend: 'up' as const,
          color: 'bg-red-500',
        },
      ]
    : [];

  // Format upload trends for chart
  const uploadTrendChartData = uploadTrends?.map((trend) => ({
    name: new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' }),
    documents: trend.count,
  }));

  // Format document counts for chart
  const documentTypeChartData = documentCounts?.map((item) => ({
    name: item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name,
    count: item.count,
  }));

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
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="w-4 h-4" />
          <span>Last updated: {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-20"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* AI Insights Panel */}
      {aiInsights && aiInsights.length > 0 && (
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
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Trend */}
        <ChartCard
          title="Document Upload Trend"
          subtitle="Last 7 days"
        >
          {trendsLoading ? (
            <div className="h-64 animate-pulse bg-gray-100 rounded"></div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={uploadTrendChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="documents"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Document Types */}
        <ChartCard
          title="Documents by Type"
          subtitle="Current distribution"
        >
          {documentsLoading ? (
            <div className="h-64 animate-pulse bg-gray-100 rounded"></div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={documentTypeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Recent Client Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Client Activity</h3>
        </div>
        <div className="p-6">
          {clientsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : clientSummaries && clientSummaries.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {clientSummaries.map((client) => (
                <ClientCard
                  key={client.id}
                  {...client}
                  onClick={() => navigate(`/clients/${client.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p>No clients yet. Add your first client to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
