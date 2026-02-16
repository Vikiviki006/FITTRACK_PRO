import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  QrCode,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Members', path: '/admin/members' },
  { icon: QrCode, label: 'Scanner', path: '/admin/scanner' },
  { icon: CalendarCheck, label: 'Attendance', path: '/admin/attendance' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'gradient-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
