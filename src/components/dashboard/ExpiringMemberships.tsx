import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Send } from 'lucide-react';
import { mockMembers } from '@/data/mockData';

export function ExpiringMemberships() {
  // Simulate members expiring soon
  const expiringMembers = mockMembers.slice(0, 3);

  return (
    <Card className="card-hover border-accent/50">
      <CardHeader className="flex flex-row items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <CardTitle className="text-lg">Expiring This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {expiringMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div>
              <p className="font-medium text-sm">{member.name}</p>
              <p className="text-xs text-muted-foreground">Expires: {member.endDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-accent text-accent">
                3 days left
              </Badge>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
