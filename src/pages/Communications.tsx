import { MessageSquare, Mail, Phone } from 'lucide-react';

export default function Communications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
        <p className="text-gray-600 mt-1">Manage client communications and reminders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <Mail className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-bold mb-2">Email</h3>
          <p className="text-2xl font-bold text-gray-900">234</p>
          <p className="text-sm text-gray-600">messages sent</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <MessageSquare className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="font-bold mb-2">WhatsApp</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">messages sent</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Phone className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="font-bold mb-2">Calls</h3>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-600">calls logged</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-12">Communication history will be displayed here</p>
      </div>
    </div>
  );
}
