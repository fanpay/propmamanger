'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  MessageSquare,
  Palette,
  UserCog,
} from 'lucide-react';
import { mockUsers } from '@/lib/mock-data/users';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

type UserRole = 'ADMIN' | 'ADVISOR' | 'COLLABORATOR';

const getRoleConfig = (role: UserRole) => {
  switch (role) {
    case 'ADMIN': return { label: 'Administrador', color: 'bg-red-500', badge: 'bg-red-100 text-red-700' };
    case 'ADVISOR': return { label: 'Asesor', color: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' };
    case 'COLLABORATOR': return { label: 'Colaborador', color: 'bg-green-500', badge: 'bg-green-100 text-green-700' };
  }
};

const BASE_NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'ADVISOR', 'COLLABORATOR'] },
  { href: '/dashboard/propiedades', label: 'Propiedades', icon: Building2, roles: ['ADMIN', 'ADVISOR', 'COLLABORATOR'] },
  { href: '/dashboard/contratos', label: 'Contratos', icon: FileText, roles: ['ADMIN', 'ADVISOR', 'COLLABORATOR'] },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users, roles: ['ADMIN', 'ADVISOR'] },
  { href: '/dashboard/agenda', label: 'Agenda', icon: Calendar, roles: ['ADMIN', 'ADVISOR', 'COLLABORATOR'] },
  { href: '/dashboard/configuracion/plantillas', label: 'Plantillas', icon: MessageSquare, roles: ['ADMIN', 'ADVISOR'] },
];

const ADMIN_SETTINGS_NAV = [
  { href: '/dashboard/configuracion/usuarios', label: 'Usuarios', icon: UserCog, roles: ['ADMIN'] },
  { href: '/dashboard/configuracion/apariencia', label: 'Apariencia', icon: Palette, roles: ['ADMIN'] },
  { href: '/dashboard/configuracion', label: 'General', icon: Settings, roles: ['ADMIN', 'ADVISOR'] },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<UserRole>('ADVISOR');
  const [currentUser, setCurrentUser] = useState(mockUsers[1]); // default advisor

  useEffect(() => {
    const role = (sessionStorage.getItem('userRole') || 'ADVISOR') as UserRole;
    const email = sessionStorage.getItem('userEmail');
    setUserRole(role);
    const found = mockUsers.find(u => u.email === email);
    if (found) setCurrentUser(found);
  }, []);

  const visibleNav = BASE_NAV.filter(item => item.roles.includes(userRole));
  const visibleSettings = ADMIN_SETTINGS_NAV.filter(item => item.roles.includes(userRole));
  const roleConfig = getRoleConfig(userRole);

  return (
    <div
      className={cn(
        'flex flex-col h-full text-white transition-all duration-300 flex-shrink-0 relative',
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
          <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Colapsar sidebar">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button onClick={onToggle} className="absolute -right-3 top-6 w-6 h-6 bg-white rounded-full shadow-card border border-border flex items-center justify-center text-primary hover:bg-surface transition-colors" title="Expandir sidebar">
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* User info with badge */}
      <div className={cn('flex items-center gap-3 px-4 py-4 border-b border-white/10', collapsed && 'justify-center px-2')}>
        {currentUser.avatar ? (
          <div className="relative flex-shrink-0">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary" />
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#111f30] ${roleConfig.color}`} title={roleConfig.label} />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold flex-shrink-0">
            {currentUser.name.charAt(0)}
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{currentUser.name}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${roleConfig.badge}`}>{roleConfig.label}</span>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {visibleNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} title={collapsed ? label : undefined} className={cn('relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200', active ? 'bg-white/20 text-white font-semibold' : 'text-blue-200 hover:bg-white/10 hover:text-white', collapsed && 'justify-center px-2')}>
              {active && !collapsed && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full" />}
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}

        {/* Settings section */}
        {visibleSettings.length > 0 && (
          <>
            {!collapsed && <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-3 pt-4 pb-1">Configuración</p>}
            {collapsed && <div className="border-t border-white/10 my-2" />}
            {visibleSettings.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href);
              return (
                <Link key={href} href={href} title={collapsed ? label : undefined} className={cn('relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200', active ? 'bg-white/20 text-white font-semibold' : 'text-blue-200 hover:bg-white/10 hover:text-white', collapsed && 'justify-center px-2')}>
                  {active && !collapsed && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full" />}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{label}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <Link href="/login" title={collapsed ? 'Cerrar sesión' : undefined} onClick={() => sessionStorage.clear()} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-300 hover:bg-white/10 hover:text-white transition-all', collapsed && 'justify-center px-2')}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
}
