import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Member } from '@/types/gym';

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: Omit<Member, 'id' | 'barcodeId' | 'createdAt'>) => void;
}

export function AddMemberDialog({ open, onOpenChange, onAdd }: AddMemberDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
    startDate: new Date().toISOString().split('T')[0],
    fee: 1500,
    paid: false,
  });

  const membershipFees = {
    monthly: 1500,
    quarterly: 4000,
    yearly: 12000,
  };

  const handleMembershipChange = (value: 'monthly' | 'quarterly' | 'yearly') => {
    setFormData({ ...formData, membershipType: value, fee: membershipFees[value] });
  };

  const calculateEndDate = () => {
    const start = new Date(formData.startDate);
    switch (formData.membershipType) {
      case 'monthly':
        start.setMonth(start.getMonth() + 1);
        break;
      case 'quarterly':
        start.setMonth(start.getMonth() + 3);
        break;
      case 'yearly':
        start.setFullYear(start.getFullYear() + 1);
        break;
    }
    return start.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    onAdd({
      ...formData,
      endDate: calculateEndDate(),
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      membershipType: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      fee: 1500,
      paid: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-gradient">Add New Member</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="membership">Membership Type</Label>
              <Select value={formData.membershipType} onValueChange={handleMembershipChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly - ₹1,500</SelectItem>
                  <SelectItem value="quarterly">Quarterly - ₹4,000</SelectItem>
                  <SelectItem value="yearly">Yearly - ₹12,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Membership Fee</span>
              <span className="font-semibold">₹{formData.fee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">End Date</span>
              <span className="font-semibold">{calculateEndDate()}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="gradient-primary" onClick={handleSubmit}>Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
