import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Member } from '@/types/gym';
import { QrCode, Edit, Trash2, Phone, Mail } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  onViewQR?: (member: Member) => void;
}

const membershipColors = {
  monthly: 'bg-primary',
  quarterly: 'bg-secondary',
  yearly: 'gradient-success',
};

export function MemberCard({ member, onEdit, onDelete, onViewQR }: MemberCardProps) {
  const daysLeft = Math.max(0, Math.ceil((new Date(member.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const isExpiringSoon = daysLeft <= 7;
  const isExpired = daysLeft === 0;

  return (
    <Card className="card-hover overflow-hidden">
      <div className={`h-1 ${membershipColors[member.membershipType]}`} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.id}</p>
            </div>
          </div>
          <Badge 
            variant={member.paid ? 'default' : 'destructive'}
            className={member.paid ? 'gradient-success border-0' : ''}
          >
            {member.paid ? 'Paid' : 'Pending'}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            {member.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {member.phone}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-4">
          <div>
            <p className="text-xs text-muted-foreground capitalize">{member.membershipType} Plan</p>
            <p className="font-semibold">₹{member.fee.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Days Left</p>
            <p className={`font-semibold ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-accent' : 'text-success'}`}>
              {isExpired ? 'Expired' : daysLeft}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewQR?.(member)}
          >
            <QrCode className="h-4 w-4 mr-1" />
            QR Code
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => onEdit?.(member)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive" onClick={() => onDelete?.(member)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
