import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { mockMembers, mockAttendance } from '@/data/mockData';
import { Calendar, Clock, CreditCard, QrCode, Download, CalendarCheck, TrendingUp } from 'lucide-react';

export default function MemberDashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== 'member') {
    return <Navigate to="/admin" replace />;
  }

  // Get member data (using first member as demo)
  const member = mockMembers[0];
  const memberAttendance = mockAttendance.filter(a => a.memberId === member.id);
  
  const daysLeft = Math.max(0, Math.ceil((new Date(member.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const totalDays = Math.ceil((new Date(member.endDate).getTime() - new Date(member.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = ((totalDays - daysLeft) / totalDays) * 100;
  const isExpiringSoon = daysLeft <= 7;

  // QR Code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(member.barcodeId)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl animate-fade-in">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, <span className="text-gradient">{member.name.split(' ')[0]}!</span></h1>
          <p className="text-muted-foreground">Here's your membership overview</p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Membership Card */}
          <Card className="md:col-span-2 card-hover overflow-hidden">
            <div className="h-2 gradient-primary" />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Membership Status</span>
                <Badge className={isExpiringSoon ? 'bg-accent' : 'gradient-success border-0'}>
                  {isExpiringSoon ? 'Expiring Soon' : 'Active'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-gradient">{daysLeft}</p>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-secondary">{memberAttendance.length}</p>
                  <p className="text-xs text-muted-foreground">Total Visits</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-accent capitalize">{member.membershipType}</p>
                  <p className="text-xs text-muted-foreground">Plan</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Membership Progress</span>
                  <span>{Math.round(progressPercentage)}% used</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Start:</span>
                  <span className="font-medium">{member.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">End:</span>
                  <span className={`font-medium ${isExpiringSoon ? 'text-accent' : ''}`}>{member.endDate}</span>
                </div>
              </div>

              {isExpiringSoon && (
                <Button className="w-full gradient-accent" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Renew Membership
                </Button>
              )}
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <QrCode className="h-5 w-5 text-primary" />
                Your QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-3 bg-card rounded-xl border shadow-sm mb-4">
                <img src={qrCodeUrl} alt="Member QR Code" className="w-32 h-32" />
              </div>
              <p className="text-xs font-mono text-muted-foreground mb-4">{member.barcodeId}</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance */}
        <Card className="mt-6 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" />
              Recent Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberAttendance.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{record.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.checkInTime} - {record.checkOutTime || 'Active'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {record.checkOutTime 
                      ? `${Math.round((new Date(`1970-01-01T${record.checkOutTime}:00`).getTime() - new Date(`1970-01-01T${record.checkInTime}:00`).getTime()) / 60000)} min`
                      : 'In Progress'
                    }
                  </div>
                </div>
              ))}
            </div>

            {memberAttendance.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No attendance records yet. Start your fitness journey!</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mt-6">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl gradient-primary">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs text-muted-foreground">Consistency</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-secondary">
                  <Clock className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1.5h</p>
                  <p className="text-xs text-muted-foreground">Avg. Session</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl gradient-accent">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
