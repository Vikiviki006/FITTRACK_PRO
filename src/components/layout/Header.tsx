import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell, LogOut, User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-primary">
            <Dumbbell className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">FitTrack Pro</span>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
              <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
