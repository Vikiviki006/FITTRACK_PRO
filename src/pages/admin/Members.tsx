import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MemberCard } from '@/components/members/MemberCard';
import { AddMemberDialog } from '@/components/members/AddMemberDialog';
import { QRCodeDialog } from '@/components/members/QRCodeDialog';
import { mockMembers } from '@/data/mockData';
import { Member } from '@/types/gym';
import { Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function Members() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMemberForQR, setSelectedMemberForQR] = useState<Member | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || member.membershipType === filterType;
    const matchesPayment = filterPayment === 'all' || 
                          (filterPayment === 'paid' && member.paid) ||
                          (filterPayment === 'pending' && !member.paid);
    return matchesSearch && matchesType && matchesPayment;
  });

  const handleAddMember = (memberData: Omit<Member, 'id' | 'barcodeId' | 'createdAt'>) => {
    const newMember: Member = {
      ...memberData,
      id: `MEM-${String(members.length + 1).padStart(3, '0')}`,
      barcodeId: `GYM-${String(members.length + 1).padStart(3, '0')}-${memberData.name.split(' ').map(n => n[0]).join('')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setMembers([newMember, ...members]);
    toast.success('Member added successfully!');
  };

  const handleDeleteMember = (member: Member) => {
    setMembers(members.filter(m => m.id !== member.id));
    toast.success('Member removed successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Members</h1>
          <p className="text-muted-foreground">Manage your gym members</p>
        </div>
        <Button className="gradient-primary" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPayment} onValueChange={setFilterPayment}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onViewQR={setSelectedMemberForQR}
            onDelete={handleDeleteMember}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No members found matching your criteria.</p>
        </div>
      )}

      <AddMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddMember}
      />

      <QRCodeDialog
        member={selectedMemberForQR}
        open={!!selectedMemberForQR}
        onOpenChange={(open) => !open && setSelectedMemberForQR(null)}
      />
    </div>
  );
}
