import { z } from 'zod';

export const courseIdValidate = z.object({
  id: z.string().uuid(),
});

export const getAllCoursesValidate = z.object({
  skip: z.string().default('0'),
  take: z.string().default('10'),
  instructorId: z.string().uuid().optional(),
  searchTerm: z.string().optional(),
});

export const createCourseValidate = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  videoCount: z
    .number()
    .int()
    .positive('Video count must be a positive integer'),
  duration: z.number().int().positive('Duration must be a positive integer'),
  instructorId: z.string().uuid(),
});

export const updateCourseValidate = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  price: z
    .number()
    .nonnegative('Price must be a non-negative number')
    .optional(),
  videoCount: z
    .number()
    .int()
    .positive('Video count must be a positive integer')
    .optional(),
  duration: z
    .number()
    .int()
    .positive('Duration must be a positive integer')
    .optional(),
  viewCount: z
    .number()
    .int()
    .nonnegative('View count must be a non-negative integer')
    .optional(),
});
