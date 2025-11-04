import { useParams } from 'react-router-dom';
import { ArrowLeft, FileText, CheckSquare, MessageSquare, Upload } from 'lucide-react';

export default function ClientDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Details</h1>
          <p className="text-gray-600 mt-1">View and manage client information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Documents */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Documents</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
            <p className="text-gray-500">Documents for this client will be listed here.</p>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Tasks & Deadlines</h2>
            <p className="text-gray-500">Tasks for this client will be listed here.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-4">Client Information</h3>
            <p className="text-gray-500">Client ID: {id}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Documents</span>
                <span className="font-bold">234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tasks</span>
                <span className="font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
