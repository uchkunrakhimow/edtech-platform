import api from '@/api/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

// Auth API request
export const loginRequest = async (data: LoginPayload) =>
  api.post('/auth/login', data);
