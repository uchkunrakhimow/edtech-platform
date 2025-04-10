import { z } from 'zod';

export const testIdValidate = z.object({
  id: z.string(),
});

export const testsByCourseValidate = z.object({
  courseId: z.string(),
});

export const getAllTestsValidate = z.object({
  skip: z.string().default('0'),
  take: z.string().default('10'),
});

export const createTestValidate = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  courseId: z.string(),
});

export const updateTestValidate = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
});
