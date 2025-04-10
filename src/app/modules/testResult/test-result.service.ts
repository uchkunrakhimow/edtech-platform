import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestResult = async (data: {
  userId: string;
  testId: string;
  score: number;
}) => {
  return await prisma.testResult.create({
    data: {
      userId: data.userId,
      testId: data.testId,
      score: data.score,
      takenAt: new Date(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      test: {
        select: {
          id: true,
          title: true,
          courseId: true,
        },
      },
    },
  });
};

export const getAllTestResults = async ({
  skip,
  take,
  userId,
  testId,
}: {
  skip: number;
  take: number;
  userId?: string;
  testId?: string;
}) => {
  return await prisma.testResult.findMany({
    skip,
    take,
    where: {
      ...(userId && { userId }),
      ...(testId && { testId }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      test: {
        select: {
          id: true,
          title: true,
          courseId: true,
        },
      },
    },
    orderBy: {
      takenAt: 'desc',
    },
  });
};

export const getTestResultById = async (id: string) => {
  return await prisma.testResult.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      test: {
        select: {
          id: true,
          title: true,
          courseId: true,
        },
      },
    },
  });
};

export const getTestResultByUserAndTest = async (
  userId: string,
  testId: string,
) => {
  return await prisma.testResult.findUnique({
    where: {
      userId_testId: {
        userId,
        testId,
      },
    },
  });
};

export const updateTestResult = async (
  id: string,
  data: {
    score: number;
  },
) => {
  return await prisma.testResult.update({
    where: { id },
    data: {
      score: data.score,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      test: {
        select: {
          id: true,
          title: true,
          courseId: true,
        },
      },
    },
  });
};

export const deleteTestResult = async (id: string) => {
  return await prisma.testResult.delete({
    where: { id },
  });
};
