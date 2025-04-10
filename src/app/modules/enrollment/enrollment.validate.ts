import { z } from 'zod';

export const enrollmentIdValidate = z.object({
  id: z.string(),
});

export const getAllEnrollmentsValidate = z.object({
  skip: z.string().default('0'),
  take: z.string().default('10'),
  userId: z.string().optional(),
  courseId: z.string().optional(),
});

export const createEnrollmentValidate = z.object({
  userId: z.string(),
  courseId: z.string(),
  progress: z.number().min(0).max(100).optional(),
});
