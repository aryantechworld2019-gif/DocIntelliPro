import { Settings as SettingsIcon, User, Bell, Shield, Cloud, Zap } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-bold">Settings</h2>
          </div>
          <nav className="p-2">
            {[
              { icon: User, label: 'Profile' },
              { icon: Bell, label: 'Notifications' },
              { icon: Shield, label: 'Security' },
              { icon: Cloud, label: 'Cloud Sync' },
              { icon: Zap, label: 'AI Configuration' },
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your Gemini API key"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google AI Studio</a>
              </p>
            </div>

            <div className="pt-4">
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
