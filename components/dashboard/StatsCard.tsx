import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon, iconBg = 'bg-blue-50', trend, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-[#E5E0D8] p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6B7280]">{title}</p>
          <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{value}</p>
          {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
          {trend && (
            <p className={cn('text-sm mt-1', trend.positive ? 'text-[#4CAF7D]' : 'text-[#D94F3D]')}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
