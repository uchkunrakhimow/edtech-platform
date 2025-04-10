import api from '@/api/axios';

// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

export interface GetUsersParams {
  skip?: number;
  take?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getUsersRequest = async (
  params?: GetUsersParams,
): Promise<ApiResponse<User[]>> => {
  try {
    const response = await api.get('/api/user', { params });
    return response.data;
  } catch (error) {
    console.error('Error in getUsersRequest:', error);
    throw error;
  }
};

export const getUserByIdRequest = async (
  id: string,
): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getUserByIdRequest:', error);
    throw error;
  }
};

export const createUserRequest = async (
  data: CreateUserData,
): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post('/api/user', data);
    return response.data;
  } catch (error) {
    console.error('Error in createUserRequest:', error);
    throw error;
  }
};

export const updateUserRequest = async (
  id: string,
  data: UpdateUserData,
): Promise<ApiResponse<User>> => {
  try {
    const response = await api.put(`/api/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in updateUserRequest:', error);
    throw error;
  }
};

export const deleteUserRequest = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/user/${id}`);
  } catch (error) {
    console.error('Error in deleteUserRequest:', error);
    throw error;
  }
};
