import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1B3A5C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-7 h-7" />
              <span className="text-xl font-bold">PropManager</span>
            </div>
            <p className="text-sm text-blue-200">Especialistas en propiedades en Medellín</p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <h4 className="font-semibold mb-3">Propiedades</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/propiedades?op=RENT" className="hover:text-white transition-colors">Arriendos</Link></li>
              <li><Link href="/propiedades?op=SALE" className="hover:text-white transition-colors">Ventas</Link></li>
              <li><Link href="/propiedades?type=APARTMENT" className="hover:text-white transition-colors">Apartamentos</Link></li>
              <li><Link href="/propiedades?type=HOUSE" className="hover:text-white transition-colors">Casas</Link></li>
              <li><Link href="/propiedades?type=OFFICE" className="hover:text-white transition-colors">Oficinas</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/contacto" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Trabaja con nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Portal asesores</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+57 (4) 444-5566</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@propmanager.co</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>El Poblado, Medellín, Antioquia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} PropManager. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
