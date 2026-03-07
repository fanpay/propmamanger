'use client';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { mockAdvisor } from '@/lib/mock-data/advisor';

const BREADCRUMBS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/propiedades': 'Mis Propiedades',
  '/dashboard/propiedades/nueva': 'Nueva Propiedad',
  '/dashboard/contratos': 'Contratos',
  '/dashboard/clientes': 'Clientes',
  '/dashboard/agenda': 'Agenda',
  '/dashboard/configuracion': 'Configuración',
};

export default function TopBar() {
  const pathname = usePathname();
  const title = BREADCRUMBS[pathname] ?? 'Panel';

  return (
    <div className="h-16 bg-white border-b border-[#E5E0D8] flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-lg font-semibold text-[#1A1A1A]">{title}</h1>
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#D94F3D] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          {mockAdvisor.avatar ? (
            <img
              src={mockAdvisor.avatar}
              alt={mockAdvisor.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white text-sm font-bold">
              {mockAdvisor.name.charAt(0)}
            </div>
          )}
          <span className="text-sm font-medium text-[#1A1A1A] hidden sm:block">{mockAdvisor.name}</span>
        </div>
      </div>
    </div>
  );
}
