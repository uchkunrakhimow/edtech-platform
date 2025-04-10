import api from '@/api/axios';

// Course interfaces
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  videoCount: number;
  duration: number;
  instructorId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  videoCount: number;
  duration: number;
  instructorId: string;
}

export interface UpdateCourseData {
  title?: string;
  description?: string;
  price?: number;
  videoCount?: number;
  duration?: number;
}

export interface GetCoursesParams {
  skip?: number;
  take?: number;
  instructorId?: string;
  searchTerm?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getCoursesRequest = async (
  params?: GetCoursesParams,
): Promise<ApiResponse<Course[]>> => {
  try {
    const response = await api.get('/api/course', { params });
    return response.data;
  } catch (error) {
    console.error('Error in getCoursesRequest:', error);
    throw error;
  }
};

export const getPopularCoursesRequest = async (
  limit?: number,
): Promise<ApiResponse<Course[]>> => {
  try {
    const response = await api.get('/api/course/popular', {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getPopularCoursesRequest:', error);
    throw error;
  }
};

export const getCourseByIdRequest = async (
  id: string,
): Promise<ApiResponse<Course>> => {
  try {
    const response = await api.get(`/api/course/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getCourseByIdRequest:', error);
    throw error;
  }
};

export const createCourseRequest = async (
  data: CreateCourseData,
): Promise<ApiResponse<Course>> => {
  try {
    const response = await api.post('/api/course', data);
    return response.data;
  } catch (error) {
    console.error('Error in createCourseRequest:', error);
    throw error;
  }
};

export const updateCourseRequest = async (
  id: string,
  data: UpdateCourseData,
): Promise<ApiResponse<Course>> => {
  try {
    const response = await api.put(`/api/course/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in updateCourseRequest:', error);
    throw error;
  }
};

export const deleteCourseRequest = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/course/${id}`);
  } catch (error) {
    console.error('Error in deleteCourseRequest:', error);
    throw error;
  }
};
