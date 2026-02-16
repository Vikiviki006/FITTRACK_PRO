export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  membershipType: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  fee: number;
  paid: boolean;
  barcodeId: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  memberId: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  expiringThisWeek: number;
  monthlyRevenue: number;
  todayCheckIns: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  memberId?: string;
}
