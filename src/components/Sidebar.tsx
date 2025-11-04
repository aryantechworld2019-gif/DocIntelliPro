import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/app.store';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/communications', icon: MessageSquare, label: 'Communications' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {sidebarOpen ? (
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">DocIntelliPro</span>
          </div>
        ) : (
          <Sparkles className="w-8 h-8 text-primary-600 mx-auto" />
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Version info */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500 text-center">
          v1.0.0 • Pro Plan
        </div>
      )}
    </aside>
  );
}
