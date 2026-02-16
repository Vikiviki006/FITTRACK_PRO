import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell, Lock, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'member') => {
    setError('');
    const success = login(email, password, role);
    if (success) {
      toast.success(`Welcome back!`);
      navigate(role === 'admin' ? '/admin' : '/member');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero">
      <Card className="w-full max-w-md glass animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto p-4 rounded-2xl gradient-primary w-fit">
            <Dumbbell className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gradient">FitTrack Pro</CardTitle>
            <CardDescription className="mt-2">Smart Gym Management System</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="member">Member</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin('admin'); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@gym.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full gradient-primary" size="lg">
                  Login as Admin
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Demo: admin@gym.com / admin123
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="member">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin('member'); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="member-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="member-email"
                      type="email"
                      placeholder="member@gym.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="member-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                  Login as Member
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Demo: member@gym.com / member123
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
