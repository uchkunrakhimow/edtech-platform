import { create } from 'zustand';
import { toast } from 'sonner';
import {
  Course,
  CreateCourseData,
  UpdateCourseData,
  GetCoursesParams,
  getCoursesRequest,
  getCourseByIdRequest,
  createCourseRequest,
  updateCourseRequest,
  deleteCourseRequest,
  getPopularCoursesRequest,
} from '@/services/course-requests';

interface CourseState {
  courses: Course[];
  popularCourses: Course[];
  totalCourses: number;
  isLoading: boolean;
  error: string | null;
  currentCourse: Course | null;
  params: GetCoursesParams;

  getCourses: (params?: GetCoursesParams) => Promise<void>;
  getPopularCourses: (limit?: number) => Promise<void>;
  getCourseById: (id: string) => Promise<void>;
  createCourse: (data: CreateCourseData) => Promise<boolean>;
  updateCourse: (id: string, data: UpdateCourseData) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<boolean>;
  setParams: (params: GetCoursesParams) => void;
  clearCurrentCourse: () => void;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  popularCourses: [],
  totalCourses: 0,
  currentCourse: null,
  isLoading: false,
  error: null,
  params: {
    skip: 0,
    take: 10,
  },

  getCourses: async (params?: GetCoursesParams) => {
    try {
      set({ isLoading: true, error: null });

      const mergedParams = { ...get().params, ...params };
      set({ params: mergedParams });

      const apiResponse = await getCoursesRequest(mergedParams);

      if (
        apiResponse &&
        apiResponse.success &&
        Array.isArray(apiResponse.data)
      ) {
        set({
          courses: apiResponse.data,
          totalCourses: apiResponse.data.length,
          isLoading: false,
        });
      } else {
        set({
          error: 'Invalid data format received from server',
          isLoading: false,
        });
        toast.error('Failed to load courses', {
          description: 'Received invalid data format from server',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch courses';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error fetching courses', { description: errorMessage });
    }
  },

  getPopularCourses: async (limit = 5) => {
    try {
      set({ isLoading: true, error: null });

      const apiResponse = await getPopularCoursesRequest(limit);

      if (
        apiResponse &&
        apiResponse.success &&
        Array.isArray(apiResponse.data)
      ) {
        set({
          popularCourses: apiResponse.data,
          isLoading: false,
        });
      } else {
        set({
          error: 'Invalid data format received from server',
          isLoading: false,
        });
        toast.error('Failed to load popular courses', {
          description: 'Received invalid data format from server',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch popular courses';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error fetching popular courses', {
        description: errorMessage,
      });
    }
  },

  getCourseById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await getCourseByIdRequest(id);
      if (response && response.success) {
        set({ currentCourse: response.data, isLoading: false });
      } else {
        set({ error: 'Failed to get course details', isLoading: false });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch course';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error fetching course', { description: errorMessage });
    }
  },

  createCourse: async (data: CreateCourseData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await createCourseRequest(data);
      if (response && response.success) {
        await get().getCourses();
        set({ isLoading: false });
        toast.success('Course created successfully');
        return true;
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create course';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error creating course', { description: errorMessage });
      return false;
    }
  },

  updateCourse: async (id: string, data: UpdateCourseData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await updateCourseRequest(id, data);
      if (response && response.success) {
        // Refresh current course list
        await get().getCourses();

        // If viewing this course's details, refresh that too
        if (get().currentCourse?.id === id) {
          await get().getCourseById(id);
        }

        // Also update popular courses if we're maintaining that list
        if (get().popularCourses.length > 0) {
          await get().getPopularCourses();
        }

        set({ isLoading: false });
        toast.success('Course updated successfully');
        return true;
      } else {
        throw new Error('Failed to update course');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update course';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error updating course', { description: errorMessage });
      return false;
    }
  },

  deleteCourse: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await deleteCourseRequest(id);

      // Refresh course list
      await get().getCourses();

      // Also update popular courses if we're maintaining that list
      if (get().popularCourses.length > 0) {
        await get().getPopularCourses();
      }

      // Clear current course if it was the deleted one
      if (get().currentCourse?.id === id) {
        set({ currentCourse: null });
      }

      set({ isLoading: false });
      toast.success('Course deleted successfully');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete course';
      set({ error: errorMessage, isLoading: false });
      toast.error('Error deleting course', { description: errorMessage });
      return false;
    }
  },

  setParams: (params: GetCoursesParams) => {
    set({ params: { ...get().params, ...params } });
  },

  clearCurrentCourse: () => {
    set({ currentCourse: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
