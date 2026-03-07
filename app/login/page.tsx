'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('carlos.garcia@propmanager.co');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] to-[#2d5a8e] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Building2 className="w-8 h-8 text-[#1B3A5C]" />
          <span className="text-2xl font-bold text-[#1B3A5C]">PropManager</span>
        </div>

        <h1 className="text-xl font-semibold text-center text-[#1A1A1A] mb-1">Bienvenido de vuelta</h1>
        <p className="text-sm text-center text-[#6B7280] mb-6">Ingresa a tu panel de gestión</p>

        {/* Demo notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-6 text-sm text-blue-700 text-center">
          Demo: Acceso de prueba habilitado
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1B3A5C] text-white rounded-lg font-medium hover:bg-[#152d47] transition-colors disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#6B7280] hover:text-[#1B3A5C] transition-colors">
            ← Volver al portal
          </Link>
        </div>
      </div>
    </div>
  );
}
