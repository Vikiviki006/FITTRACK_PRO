import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockMembers } from '@/data/mockData';

export function RecentMembers() {
  const recentMembers = mockMembers.slice(0, 5);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Recent Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="gradient-primary text-primary-foreground text-sm">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <Badge 
              variant={member.paid ? 'default' : 'destructive'}
              className={member.paid ? 'gradient-success border-0' : ''}
            >
              {member.paid ? 'Paid' : 'Pending'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
