import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  color?: string;
}

export default function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  trend = 'up',
  color = 'bg-blue-500',
}: StatsCardProps) {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className={`flex items-center space-x-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">{change}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}
