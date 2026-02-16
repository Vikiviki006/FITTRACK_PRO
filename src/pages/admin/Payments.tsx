import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockMembers } from '@/data/mockData';
import { CreditCard, Download, IndianRupee, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Payments() {
  const totalRevenue = mockMembers.filter(m => m.paid).reduce((sum, m) => sum + m.fee, 0);
  const pendingAmount = mockMembers.filter(m => !m.paid).reduce((sum, m) => sum + m.fee, 0);
  const paidCount = mockMembers.filter(m => m.paid).length;
  const pendingCount = mockMembers.filter(m => !m.paid).length;

  const handleMarkPaid = (memberId: string) => {
    toast.success('Payment marked as received!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Payments</h1>
          <p className="text-muted-foreground">Manage membership fees and payments</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl gradient-success">
                <IndianRupee className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold text-accent">₹{pendingAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl gradient-accent">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Members</p>
                <p className="text-2xl font-bold text-success">{paidCount}</p>
              </div>
              <div className="p-3 rounded-xl gradient-success">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-destructive">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive">
                <CreditCard className="h-6 w-6 text-destructive-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{member.membershipType}</TableCell>
                  <TableCell className="font-semibold">₹{member.fee.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {member.startDate} - {member.endDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.paid ? 'default' : 'destructive'}
                      className={member.paid ? 'gradient-success border-0' : ''}
                    >
                      {member.paid ? 'Paid' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {!member.paid && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMarkPaid(member.id)}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
