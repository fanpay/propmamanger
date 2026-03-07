'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockAdvisor } from '@/lib/mock-data/advisor';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/propiedades', label: 'Mis Propiedades', icon: Building2 },
  { href: '/dashboard/contratos', label: 'Contratos', icon: FileText },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
  { href: '/dashboard/agenda', label: 'Agenda', icon: Calendar },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-[#1B3A5C] text-white transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            <span className="font-bold text-lg">PropManager</span>
          </div>
        )}
        {collapsed && <Building2 className="w-6 h-6 mx-auto" />}
        <button
          onClick={onToggle}
          className={cn('p-1 rounded hover:bg-blue-800 transition-colors', collapsed && 'mx-auto mt-0')}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Advisor info */}
      <div className={cn('flex items-center gap-3 px-4 py-4 border-b border-blue-800', collapsed && 'justify-center px-2')}>
        {mockAdvisor.avatar ? (
          <img
            src={mockAdvisor.avatar}
            alt={mockAdvisor.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {mockAdvisor.name.charAt(0)}
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{mockAdvisor.name}</p>
            <p className="text-xs text-blue-300">Asesor</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                active ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-blue-800">
        <Link
          href="/login"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200 hover:bg-white/10 hover:text-white transition-colors',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Cerrar sesión' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
}
