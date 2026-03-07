import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropManager - Gestión Inmobiliaria",
  description: "Plataforma de gestión inmobiliaria para Medellín",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
