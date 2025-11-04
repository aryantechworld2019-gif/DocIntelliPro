import { TrendingUp, Download } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Detailed insights and performance metrics</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Time Saved', value: '127 hrs', change: '+23%' },
          { label: 'Documents Processed', value: '2,847', change: '+15%' },
          { label: 'Clients Served', value: '234', change: '+8%' },
          { label: 'Revenue', value: '₹2.8L', change: '+12%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <div className="flex items-center space-x-1 mt-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-12">Detailed analytics and charts will be displayed here</p>
      </div>
    </div>
  );
}
