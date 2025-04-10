import { z } from 'zod';

export const testResultIdValidate = z.object({
  id: z.string().uuid(),
});

export const getAllTestResultsValidate = z.object({
  skip: z.string().default('0'),
  take: z.string().default('10'),
  userId: z.string().uuid().optional(),
  testId: z.string().uuid().optional(),
});

export const createTestResultValidate = z.object({
  userId: z.string().uuid(),
  testId: z.string().uuid(),
  score: z.number().min(0).max(100),
});

export const updateTestResultValidate = z.object({
  score: z.number().min(0).max(100),
});
