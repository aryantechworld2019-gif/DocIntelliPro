import { CheckSquare, Clock, AlertCircle } from 'lucide-react';

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tasks & Deadlines</h1>
        <p className="text-gray-600 mt-1">Track filing deadlines and pending tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold">Pending</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">18</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-bold">Urgent</h3>
          </div>
          <div className="text-3xl font-bold text-red-600">3</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <h3 className="font-bold">Completed</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">142</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-12">Task list will be displayed here</p>
      </div>
    </div>
  );
}
