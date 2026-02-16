import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
}

const variantStyles = {
  primary: 'gradient-primary',
  secondary: 'bg-secondary',
  accent: 'gradient-accent',
  success: 'gradient-success',
};

export function StatsCard({ title, value, icon: Icon, trend, variant = 'primary' }: StatsCardProps) {
  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <p className={cn('text-sm font-medium', trend.isPositive ? 'text-success' : 'text-destructive')}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', variantStyles[variant])}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
