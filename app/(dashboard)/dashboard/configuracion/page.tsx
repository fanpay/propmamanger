import { Settings } from 'lucide-react';

export default function ConfiguracionPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[#1A1A1A]">Configuración</h1>
      <div className="bg-white rounded-xl border border-[#E5E0D8] p-8 text-center">
        <Settings className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
        <p className="text-lg font-medium text-[#1A1A1A]">Próximamente</p>
        <p className="text-sm text-[#6B7280] mt-1">
          Las opciones de configuración estarán disponibles en la próxima versión.
        </p>
      </div>
    </div>
  );
}
