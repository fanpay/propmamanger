import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    APARTMENT: 'Apartamento',
    HOUSE: 'Casa',
    OFFICE: 'Oficina',
    LOCAL: 'Local',
    WAREHOUSE: 'Bodega',
    LOT: 'Lote',
  };
  return labels[type] || type;
}

export function getOperationLabel(op: string): string {
  const labels: Record<string, string> = {
    RENT: 'Arriendo',
    SALE: 'Venta',
    RENT_SALE: 'Arriendo/Venta',
  };
  return labels[op] || op;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    AVAILABLE: 'Disponible',
    RENTED: 'Arrendado',
    SOLD: 'Vendido',
    NEGOTIATION: 'En negociación',
    PAUSED: 'Pausado',
    DRAFT: 'Borrador',
    ACTIVE: 'Activo',
    EXPIRED: 'Vencido',
    TERMINATED: 'Terminado',
    RENEWED: 'Renovado',
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmada',
    DONE: 'Realizada',
    CANCELLED: 'Cancelada',
  };
  return labels[status] || status;
}
