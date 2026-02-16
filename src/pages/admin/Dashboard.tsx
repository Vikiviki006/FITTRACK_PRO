import { StatsCard } from '@/components/dashboard/StatsCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RecentMembers } from '@/components/dashboard/RecentMembers';
import { ExpiringMemberships } from '@/components/dashboard/ExpiringMemberships';
import { mockStats } from '@/data/mockData';
import { Users, UserCheck, AlertTriangle, IndianRupee, CalendarCheck } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your gym overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Members"
          value={mockStats.totalMembers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title="Active Members"
          value={mockStats.activeMembers}
          icon={UserCheck}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="Expiring Soon"
          value={mockStats.expiringThisWeek}
          icon={AlertTriangle}
          variant="accent"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`₹${(mockStats.monthlyRevenue / 1000).toFixed(0)}k`}
          icon={IndianRupee}
          trend={{ value: 15, isPositive: true }}
          variant="secondary"
        />
        <StatsCard
          title="Today's Check-ins"
          value={mockStats.todayCheckIns}
          icon={CalendarCheck}
          variant="primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <AttendanceChart />
      </div>

      {/* Members Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMembers />
        <ExpiringMemberships />
      </div>
    </div>
  );
}
