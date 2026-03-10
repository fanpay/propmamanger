import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { AppConfigProvider } from "@/lib/contexts/AppConfigContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PropManager Medellín — Gestión Inmobiliaria",
  description:
    "Plataforma de gestión inmobiliaria para Medellín. Encuentra apartamentos, casas y locales en arriendo y venta.",
  keywords: "inmobiliaria, Medellín, arriendo, venta, apartamentos, casas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased font-body bg-surface text-text-main">
        <AppConfigProvider>{children}</AppConfigProvider>
      </body>
    </html>
  );
}
