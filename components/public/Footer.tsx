import Link from 'next/link';
import {
  Building2, Phone, Mail, MapPin,
  Instagram, Facebook, Twitter,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary to-[#111f30] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">¿Necesitas asesoría personalizada?</h3>
            <p className="text-blue-200 text-sm mt-0.5">Habla con uno de nuestros asesores hoy mismo.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://wa.me/574445566?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20propiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors text-sm"
            >
              WhatsApp
            </a>
            <Link
              href="/contacto"
              className="px-5 py-2.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">PropManager</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Especialistas en propiedades residenciales y comerciales en Medellín y el Área Metropolitana desde 2012.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 hover:bg-secondary hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <h4 className="font-display font-semibold mb-4">Propiedades</h4>
            <ul className="space-y-2.5 text-sm text-blue-200">
              {[
                { href: '/propiedades?op=RENT', label: 'Arriendos' },
                { href: '/propiedades?op=SALE', label: 'Ventas' },
                { href: '/propiedades?type=APARTMENT', label: 'Apartamentos' },
                { href: '/propiedades?type=HOUSE', label: 'Casas' },
                { href: '/propiedades?type=OFFICE', label: 'Oficinas' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2.5 text-sm text-blue-200">
              {[
                { href: '/contacto', label: 'Nosotros' },
                { href: '/contacto', label: 'Trabaja con nosotros' },
                { href: '/contacto', label: 'Blog' },
                { href: '/login', label: 'Portal asesores' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>+57 (4) 444-5566</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>info@propmanager.co</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>El Poblado, Medellín, Antioquia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-blue-300">
          <span>© {new Date().getFullYear()} PropManager. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
