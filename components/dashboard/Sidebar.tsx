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
        'flex flex-col h-full text-white transition-all duration-300 flex-shrink-0',
        'bg-gradient-to-b from-primary to-[#111f30]',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">PropManager</span>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center mx-auto">
            <Building2 className="w-4 h-4 text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Colapsar sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-6 w-6 h-6 bg-white rounded-full shadow-card border border-border flex items-center justify-center text-primary hover:bg-surface transition-colors"
            title="Expandir sidebar"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Advisor info */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-4 border-b border-white/10',
          collapsed && 'justify-center px-2'
        )}
      >
        {mockAdvisor.avatar ? (
          <img
            src={mockAdvisor.avatar}
            alt={mockAdvisor.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-secondary"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold flex-shrink-0">
            {mockAdvisor.name.charAt(0)}
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{mockAdvisor.name}</p>
            <p className="text-xs text-blue-300">Asesor Inmobiliario</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                active
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
            >
              {/* Active indicator bar */}
              {active && !collapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full" />
              )}
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <Link
          href="/login"
          title={collapsed ? 'Cerrar sesión' : undefined}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-300 hover:bg-white/10 hover:text-white transition-all',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
}
