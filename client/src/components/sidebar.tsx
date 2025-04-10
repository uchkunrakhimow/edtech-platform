import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LucideHome,
  LucideUsers,
  LucideBookOpen,
  LucideMenu,
  LucideLogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';
import SideLink from '@/lib/side-link';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LucideHome,
    },
    {
      path: '/users',
      label: 'Users',
      icon: LucideUsers,
    },
    {
      path: '/courses',
      label: 'Courses',
      icon: LucideBookOpen,
    },
  ];

  return (
    <aside
      className={cn(
        'bg-card border-r flex flex-col h-full transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">EdTech Admin</h1>}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          <LucideMenu size={20} />
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SideLink
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={collapsed ? '' : item.label}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          onClick={handleLogout}
        >
          <LucideLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
