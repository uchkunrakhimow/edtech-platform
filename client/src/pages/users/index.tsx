import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/user-store';
import { DataTable } from '../../components/data-table';
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateUserDialog } from './create-user';

const UsersPage = () => {
  const { users, isLoading, getUsers } = useUserStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        searchField="email"
        searchPlaceholder="Filter by email..."
      />

      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};

export default UsersPage;
