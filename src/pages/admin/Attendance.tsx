import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockAttendance, mockMembers } from '@/data/mockData';
import { Calendar, Download, Search } from 'lucide-react';
import { useState } from 'react';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getMemberName = (memberId: string) => {
    return mockMembers.find(m => m.id === memberId)?.name || 'Unknown';
  };

  const filteredAttendance = mockAttendance.filter(a => a.date === selectedDate || selectedDate === '');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Attendance</h1>
          <p className="text-muted-foreground">Track daily member check-ins</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gradient">{filteredAttendance.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Check-ins Today</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">06:30</p>
              <p className="text-sm text-muted-foreground mt-1">Earliest Check-in</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">1.5h</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. Session Duration</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Attendance Log
          </CardTitle>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => {
                const duration = record.checkOutTime 
                  ? `${Math.round((new Date(`1970-01-01T${record.checkOutTime}:00`).getTime() - new Date(`1970-01-01T${record.checkInTime}:00`).getTime()) / 60000)} min`
                  : '-';
                
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{getMemberName(record.memberId)}</TableCell>
                    <TableCell className="text-muted-foreground">{record.memberId}</TableCell>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime || '-'}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>
                      <Badge variant={record.checkOutTime ? 'default' : 'secondary'} className={record.checkOutTime ? 'gradient-success border-0' : ''}>
                        {record.checkOutTime ? 'Completed' : 'Active'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredAttendance.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No attendance records for this date.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
