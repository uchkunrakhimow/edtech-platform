import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEnrollment = async (data: {
  userId: string;
  courseId: string;
  progress?: number;
}) => {
  return await prisma.enrollment.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      progress: data.progress || 0,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          instructor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

export const getAllEnrollments = async ({
  skip,
  take,
  userId,
  courseId,
}: {
  skip: number;
  take: number;
  userId?: string;
  courseId?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (userId) {
    where.userId = userId;
  }

  if (courseId) {
    where.courseId = courseId;
  }

  return await prisma.enrollment.findMany({
    where,
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          instructor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      enrolledAt: 'desc',
    },
  });
};

export const getEnrollmentById = async (id: string) => {
  return await prisma.enrollment.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          duration: true,
          videoCount: true,
          instructor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

export const checkExistingEnrollment = async (
  userId: string,
  courseId: string,
) => {
  return await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
};
