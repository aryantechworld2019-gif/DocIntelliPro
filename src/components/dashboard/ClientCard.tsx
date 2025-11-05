import { Phone, FileText, Clock, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ClientCardProps {
  id: number;
  name: string;
  phone: string;
  totalDocuments: number;
  lastUpload: string | null;
  status: 'active' | 'inactive' | 'warning';
  missingDocs: string[];
  pendingTasks: number;
  onClick?: () => void;
}

export default function ClientCard({
  name,
  phone,
  totalDocuments,
  lastUpload,
  status,
  missingDocs,
  pendingTasks,
  onClick,
}: ClientCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  const statusLabels = {
    active: 'Active',
    warning: 'Warning',
    inactive: 'Inactive',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Phone className="w-4 h-4 mr-1" />
            {phone}
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FileText className="w-4 h-4 mr-2" />
          <span>{totalDocuments} documents</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Last upload:{' '}
            {lastUpload ? formatDistanceToNow(new Date(lastUpload), { addSuffix: true }) : 'Never'}
          </span>
        </div>
      </div>

      {missingDocs.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <div className="flex items-start">
            <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Missing Documents:</p>
              <p className="text-xs text-red-600 mt-1">{missingDocs.join(', ')}</p>
            </div>
          </div>
        </div>
      )}

      {pendingTasks > 0 && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">Pending tasks</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            {pendingTasks}
          </span>
        </div>
      )}
    </div>
  );
}
