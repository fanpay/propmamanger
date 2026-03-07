import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; positive: boolean };
  accentColor?: string; // e.g. 'border-primary', 'border-accent', 'border-warning'
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = 'bg-blue-50',
  trend,
  accentColor = 'border-primary',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-card border border-border overflow-hidden card-hover',
        'border-l-4',
        accentColor,
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-sm text-text-muted font-medium">{title}</p>
            <p className="text-3xl font-display font-bold text-text-main mt-1.5 tabular-nums">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-text-muted mt-1">{subtitle}</p>
            )}
            {trend && (
              <p className={cn('text-sm mt-1.5 font-medium flex items-center gap-1', trend.positive ? 'text-accent' : 'text-danger')}>
                <span className="text-base">{trend.positive ? '↑' : '↓'}</span>
                {Math.abs(trend.value)}%
                <span className="text-text-muted font-normal text-xs">vs mes anterior</span>
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-2xl flex-shrink-0', iconBg)}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
