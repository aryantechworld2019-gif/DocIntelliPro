import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Phone, Mail, Briefcase } from 'lucide-react';

// Mock data
const mockClients = [
  {
    id: 1,
    name: 'Acme Corporation',
    phone: '+91 98765 43210',
    email: 'contact@acmecorp.com',
    gstin: '29ABCDE1234F1Z5',
    city: 'Mumbai',
    state: 'Maharashtra',
    totalDocuments: 234,
    pendingTasks: 3,
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    name: 'Tech Solutions Ltd',
    phone: '+91 98765 43211',
    email: 'info@techsolutions.com',
    gstin: '27XYZAB5678G2W4',
    city: 'Bangalore',
    state: 'Karnataka',
    totalDocuments: 189,
    pendingTasks: 0,
    lastActivity: '1 day ago',
  },
  {
    id: 3,
    name: 'Global Enterprises',
    phone: '+91 98765 43212',
    email: 'hello@globalent.com',
    gstin: '09PQRST9012H3E6',
    city: 'Delhi',
    state: 'Delhi',
    totalDocuments: 456,
    pendingTasks: 7,
    lastActivity: '3 hours ago',
  },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.gstin?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client information and documents</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or GSTIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Filters</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Clients</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{mockClients.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Active This Week</div>
          <div className="text-2xl font-bold text-green-600 mt-1">127</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Pending Tasks</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {mockClients.reduce((sum, c) => sum + c.pendingTasks, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">New This Month</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">12</div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Last active: {client.lastActivity}</p>
                </div>
                {client.pendingTasks > 0 && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    {client.pendingTasks} pending
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  GSTIN: {client.gstin}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {client.city}, {client.state}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{client.totalDocuments}</span>
                  <span className="text-sm text-gray-600 ml-2">documents</span>
                </div>
                <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No clients found matching your search.</p>
        </div>
      )}
    </div>
  );
}
