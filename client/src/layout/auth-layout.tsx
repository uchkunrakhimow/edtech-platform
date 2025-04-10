import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';

const AuthLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
