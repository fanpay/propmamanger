'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Shield, Users, Eye } from 'lucide-react';

const DEMO_ROLES = [
  {
    role: 'ADMIN',
    label: 'Administrador',
    email: 'admin@propmanager.co',
    description: 'Acceso completo: configuración, usuarios, reportes globales',
    icon: Shield,
    color: 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    role: 'ADVISOR',
    label: 'Asesor',
    email: 'asesor@propmanager.co',
    description: 'Dashboard, propiedades, contratos, clientes, agenda, plantillas',
    icon: Users,
    color: 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    role: 'COLLABORATOR',
    label: 'Colaborador',
    email: 'colaborador@propmanager.co',
    description: 'Solo consulta: ve propiedades, contratos asignados y agenda propia',
    icon: Eye,
    color: 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100',
    badgeColor: 'bg-green-100 text-green-700',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@propmanager.co');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleQuickLogin(role: string, roleEmail: string) {
    setEmail(roleEmail);
    setLoading(true);
    // Store role in sessionStorage so the Sidebar can read it
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userEmail', roleEmail);
    setTimeout(() => {
      router.push('/dashboard');
    }, 700);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Default to ADVISOR if role not set
    if (!sessionStorage.getItem('userRole')) {
      sessionStorage.setItem('userRole', 'ADVISOR');
    }
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1B3A5C] to-[#0f2234] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8873A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="w-10 h-10 bg-[#1B3A5C] rounded-xl flex items-center justify-center shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-display font-bold text-[#1B3A5C]">PropManager</span>
        </div>

        <h1 className="text-xl font-semibold text-center text-text-main mb-1">Bienvenido de vuelta</h1>
        <p className="text-sm text-center text-text-muted mb-8">Ingresa a tu panel de gestión</p>

        {/* Quick Role Access for Demo */}
        <div className="mb-6">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider text-center mb-3">
            🚀 Acceso Rápido — Demo
          </p>
          <div className="grid grid-cols-1 gap-2">
            {DEMO_ROLES.map(({ role, label, email: roleEmail, description, icon: Icon, color, badgeColor }) => (
              <button
                key={role}
                type="button"
                onClick={() => handleQuickLogin(role, roleEmail)}
                disabled={loading}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-200 disabled:opacity-60 ${color}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{role}</span>
                  </div>
                  <p className="text-xs opacity-75 leading-tight mt-0.5 line-clamp-1">{description}</p>
                </div>
                <span className="text-xs font-medium opacity-60 flex-shrink-0">Ingresar →</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-text-muted">o usa tus credenciales</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Ingresando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors">
            ← Volver al portal
          </Link>
        </div>
      </div>
    </div>
  );
}
