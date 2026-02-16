import { Member, Attendance, DashboardStats } from '@/types/gym';

export const mockMembers: Member[] = [
  {
    id: 'MEM-001',
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91 98765 43210',
    membershipType: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    fee: 1500,
    paid: true,
    barcodeId: 'GYM-001-RS',
    createdAt: '2024-01-01',
  },
  {
    id: 'MEM-002',
    name: 'Priya Patel',
    email: 'priya@email.com',
    phone: '+91 87654 32109',
    membershipType: 'quarterly',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    fee: 4000,
    paid: true,
    barcodeId: 'GYM-002-PP',
    createdAt: '2024-01-15',
  },
  {
    id: 'MEM-003',
    name: 'Amit Kumar',
    email: 'amit@email.com',
    phone: '+91 76543 21098',
    membershipType: 'yearly',
    startDate: '2024-01-10',
    endDate: '2025-01-10',
    fee: 12000,
    paid: false,
    barcodeId: 'GYM-003-AK',
    createdAt: '2024-01-10',
  },
  {
    id: 'MEM-004',
    name: 'Sneha Gupta',
    email: 'sneha@email.com',
    phone: '+91 65432 10987',
    membershipType: 'monthly',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    fee: 1500,
    paid: true,
    barcodeId: 'GYM-004-SG',
    createdAt: '2024-01-20',
  },
  {
    id: 'MEM-005',
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    phone: '+91 54321 09876',
    membershipType: 'quarterly',
    startDate: '2024-01-05',
    endDate: '2024-04-05',
    fee: 4000,
    paid: true,
    barcodeId: 'GYM-005-VS',
    createdAt: '2024-01-05',
  },
];

export const mockAttendance: Attendance[] = [
  { id: 'ATT-001', memberId: 'MEM-001', checkInTime: '06:30', checkOutTime: '08:00', date: '2024-01-15' },
  { id: 'ATT-002', memberId: 'MEM-002', checkInTime: '07:00', checkOutTime: '08:30', date: '2024-01-15' },
  { id: 'ATT-003', memberId: 'MEM-003', checkInTime: '17:00', checkOutTime: '18:30', date: '2024-01-15' },
  { id: 'ATT-004', memberId: 'MEM-004', checkInTime: '18:00', checkOutTime: '19:30', date: '2024-01-15' },
  { id: 'ATT-005', memberId: 'MEM-001', checkInTime: '06:45', checkOutTime: '08:15', date: '2024-01-14' },
  { id: 'ATT-006', memberId: 'MEM-005', checkInTime: '05:30', checkOutTime: '07:00', date: '2024-01-15' },
];

export const mockStats: DashboardStats = {
  totalMembers: 156,
  activeMembers: 142,
  expiringThisWeek: 8,
  monthlyRevenue: 245000,
  todayCheckIns: 67,
};

export const revenueData = [
  { month: 'Jan', revenue: 185000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 195000 },
  { month: 'Apr', revenue: 225000 },
  { month: 'May', revenue: 240000 },
  { month: 'Jun', revenue: 245000 },
];

export const attendanceData = [
  { day: 'Mon', checkIns: 85 },
  { day: 'Tue', checkIns: 92 },
  { day: 'Wed', checkIns: 78 },
  { day: 'Thu', checkIns: 88 },
  { day: 'Fri', checkIns: 95 },
  { day: 'Sat', checkIns: 110 },
  { day: 'Sun', checkIns: 65 },
];

export const peakHoursData = [
  { hour: '5-7 AM', count: 45 },
  { hour: '7-9 AM', count: 85 },
  { hour: '9-11 AM', count: 35 },
  { hour: '5-7 PM', count: 95 },
  { hour: '7-9 PM', count: 70 },
];
