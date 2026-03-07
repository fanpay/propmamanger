'use client';
import { useState, useEffect } from 'react';
import { Appointment } from '@/types';
import { getAppointments } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const TYPE_COLORS: Record<string, string> = {
  VISIT: 'bg-blue-100 text-blue-800 border-blue-200',
  SIGNING: 'bg-green-100 text-green-800 border-green-200',
  KEY_DELIVERY: 'bg-purple-100 text-purple-800 border-purple-200',
  INSPECTION: 'bg-orange-100 text-orange-800 border-orange-200',
};

const TYPE_LABELS: Record<string, string> = {
  VISIT: 'Visita',
  SIGNING: 'Firma',
  KEY_DELIVERY: 'Entrega llaves',
  INSPECTION: 'Inspección',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  DONE: 'Realizada',
  CANCELLED: 'Cancelada',
};

function getWeekDays(baseDate: Date): Date[] {
  const start = new Date(baseDate);
  // Move to Monday
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [baseDate, setBaseDate] = useState(new Date());
  const weekDays = getWeekDays(baseDate);

  useEffect(() => {
    getAppointments().then(setAppointments);
  }, []);

  function prevWeek() {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - 7);
    setBaseDate(d);
  }

  function nextWeek() {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + 7);
    setBaseDate(d);
  }

  const today = new Date();

  const weekLabel = `${weekDays[0].getDate()} - ${weekDays[6].getDate()} ${weekDays[6].toLocaleString('es-CO', { month: 'long', year: 'numeric' })}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1A1A1A]">Agenda</h1>
        <div className="flex items-center gap-2">
          <button onClick={prevWeek} className="p-2 rounded-lg border border-[#E5E0D8] hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-[#1A1A1A] w-52 text-center capitalize">{weekLabel}</span>
          <button onClick={nextWeek} className="p-2 rounded-lg border border-[#E5E0D8] hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#E5E0D8]">
          {weekDays.map((d) => {
            const isToday = isSameDay(d, today);
            return (
              <div key={d.toISOString()} className={cn('p-3 text-center border-r last:border-r-0 border-[#E5E0D8]', isToday && 'bg-[#1B3A5C]/5')}>
                <p className="text-xs text-[#6B7280]">{DAYS[d.getDay()]}</p>
                <p className={cn('text-lg font-semibold mt-0.5', isToday ? 'text-[#1B3A5C]' : 'text-[#1A1A1A]')}>
                  {d.getDate()}
                </p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 min-h-32">
          {weekDays.map((d) => {
            const dayAppts = appointments.filter((a) => isSameDay(a.date, d));
            const isToday = isSameDay(d, today);
            return (
              <div key={d.toISOString()} className={cn('p-2 border-r last:border-r-0 border-[#E5E0D8] space-y-1', isToday && 'bg-[#1B3A5C]/5')}>
                {dayAppts.map((a) => (
                  <div
                    key={a.id}
                    className={cn('px-2 py-1 rounded border text-xs font-medium', TYPE_COLORS[a.type] || 'bg-gray-100 text-gray-800 border-gray-200')}
                    title={`${a.clientName} - ${a.property.title}`}
                  >
                    <p>{a.date.getHours().toString().padStart(2, '0')}:{a.date.getMinutes().toString().padStart(2, '0')}</p>
                    <p className="truncate">{a.clientName}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* All appointments list */}
      <div>
        <h2 className="font-semibold text-[#1A1A1A] mb-4">Todas las citas de esta semana</h2>
        <div className="space-y-3">
          {appointments
            .filter((a) => weekDays.some((d) => isSameDay(d, a.date)))
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((a) => (
              <div key={a.id} className="bg-white rounded-xl border border-[#E5E0D8] p-4 flex items-start gap-4">
                <div className="text-center flex-shrink-0 w-14">
                  <p className="text-xs text-[#6B7280]">{DAYS[a.date.getDay()]}</p>
                  <p className="text-2xl font-bold text-[#1B3A5C]">{a.date.getDate()}</p>
                  <p className="text-xs text-[#6B7280]">
                    {a.date.getHours().toString().padStart(2, '0')}:{a.date.getMinutes().toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', TYPE_COLORS[a.type])}>
                      {TYPE_LABELS[a.type]}
                    </span>
                    <span className="text-xs text-[#6B7280]">{STATUS_LABELS[a.status]}</span>
                  </div>
                  <p className="font-medium text-[#1A1A1A]">{a.clientName}</p>
                  <p className="text-sm text-[#6B7280] truncate">{a.property.title}</p>
                  <p className="text-xs text-[#6B7280]">{a.clientPhone}</p>
                  {a.notes && <p className="text-xs text-[#6B7280] mt-1 italic">{a.notes}</p>}
                </div>
              </div>
            ))}
          {appointments.filter((a) => weekDays.some((d) => isSameDay(d, a.date))).length === 0 && (
            <p className="text-sm text-[#6B7280] text-center py-8">No hay citas esta semana</p>
          )}
        </div>
      </div>
    </div>
  );
}
