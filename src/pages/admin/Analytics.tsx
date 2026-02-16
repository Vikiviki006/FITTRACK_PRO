import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { peakHoursData, mockMembers, revenueData } from '@/data/mockData';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

export default function Analytics() {
  // Calculate membership distribution
  const membershipDistribution = [
    { name: 'Monthly', value: mockMembers.filter(m => m.membershipType === 'monthly').length, color: 'hsl(262, 83%, 58%)' },
    { name: 'Quarterly', value: mockMembers.filter(m => m.membershipType === 'quarterly').length, color: 'hsl(199, 89%, 48%)' },
    { name: 'Yearly', value: mockMembers.filter(m => m.membershipType === 'yearly').length, color: 'hsl(38, 92%, 50%)' },
  ];

  // Mock retention data
  const retentionData = [
    { month: 'Jan', rate: 85 },
    { month: 'Feb', rate: 88 },
    { month: 'Mar', rate: 82 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 92 },
    { month: 'Jun', rate: 89 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
        <p className="text-muted-foreground">Insights and trends for your gym</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl gradient-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-xs text-muted-foreground">Revenue Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-secondary">
                <Users className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-muted-foreground">Retention Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl gradient-accent">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">5-7 PM</p>
                <p className="text-xs text-muted-foreground">Peak Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl gradient-success">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">75%</p>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Peak Hours */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Peak Gym Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" />
                  <YAxis dataKey="hour" type="category" width={80} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Membership Distribution */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {membershipDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Retention Rate */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Member Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[70, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Retention']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(142, 76%, 36%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(142, 76%, 36%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(199, 89%, 48%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(199, 89%, 48%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
