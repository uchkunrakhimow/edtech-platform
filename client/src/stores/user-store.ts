import { create } from 'zustand';
import { toast } from 'sonner';
import {
  User,
  CreateUserData,
  UpdateUserData,
  GetUsersParams,
  createUserRequest,
  getUsersRequest,
  getUserByIdRequest,
  updateUserRequest,
  deleteUserRequest,
} from '@/services/user-requests';

interface UserState {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
  currentUser: User | null;
  params: GetUsersParams;

  getUsers: (params?: GetUsersParams) => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  createUser: (data: CreateUserData) => Promise<boolean>;
  updateUser: (id: string, data: UpdateUserData) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  setParams: (params: GetUsersParams) => void;
  clearCurrentUser: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  totalUsers: 0,
  currentUser: null,
  isLoading: false,
  error: null,
  params: {
    skip: 0,
    take: 10,
  },

  getUsers: async (params?: GetUsersParams) => {
    try {
      set({ isLoading: true, error: null });

      const mergedParams = { ...get().params, ...params };
      set({ params: mergedParams });

      const apiResponse = await getUsersRequest(mergedParams);

      if (
        apiResponse &&
        apiResponse.success &&
        Array.isArray(apiResponse.data)
      ) {
        set({
          users: apiResponse.data,
          totalUsers: apiResponse.data.length,
          isLoading: false,
        });
      } else {
        set({
          error: 'Invalid data format received from server',
          isLoading: false,
        });

        toast.error('Failed to load users', {
          description: 'Received invalid data format from server',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch users';

      set({
        error: errorMessage,
        isLoading: false,
      });

      toast.error('Error fetching users', {
        description: errorMessage,
      });
    }
  },

  getUserById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await getUserByIdRequest(id);

      if (response && response.success) {
        set({
          currentUser: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: 'Failed to get user details',
          isLoading: false,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch user';

      set({
        error: errorMessage,
        isLoading: false,
      });

      toast.error('Error fetching user', {
        description: errorMessage,
      });
    }
  },

  createUser: async (data: CreateUserData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await createUserRequest(data);

      if (response && response.success) {
        await get().getUsers();

        set({ isLoading: false });

        toast.success('User created successfully');
        return true;
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create user';

      set({
        error: errorMessage,
        isLoading: false,
      });

      toast.error('Error creating user', {
        description: errorMessage,
      });

      return false;
    }
  },

  updateUser: async (id: string, data: UpdateUserData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await updateUserRequest(id, data);

      if (response && response.success) {
        // Refresh user list and current user
        await get().getUsers();
        if (get().currentUser?.id === id) {
          await get().getUserById(id);
        }

        set({ isLoading: false });

        toast.success('User updated successfully');
        return true;
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update user';

      set({
        error: errorMessage,
        isLoading: false,
      });

      toast.error('Error updating user', {
        description: errorMessage,
      });

      return false;
    }
  },

  deleteUser: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      await deleteUserRequest(id);

      await get().getUsers();

      if (get().currentUser?.id === id) {
        set({ currentUser: null });
      }

      set({ isLoading: false });

      toast.success('User deleted successfully');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete user';

      set({
        error: errorMessage,
        isLoading: false,
      });

      toast.error('Error deleting user', {
        description: errorMessage,
      });

      return false;
    }
  },

  setParams: (params: GetUsersParams) => {
    set({ params: { ...get().params, ...params } });
  },

  clearCurrentUser: () => {
    set({ currentUser: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
