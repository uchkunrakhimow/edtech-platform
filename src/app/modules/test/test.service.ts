import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTest = async (data: { title: string; courseId: string }) => {
  return await prisma.test.create({
    data,
    include: {
      course: {
        select: {
          title: true,
          instructor: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const getAllTests = async ({
  skip,
  take,
}: {
  skip: number;
  take: number;
}) => {
  return await prisma.test.findMany({
    skip,
    take,
    include: {
      course: {
        select: {
          title: true,
          instructor: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          results: true,
        },
      },
    },
  });
};

export const getTestById = async (id: string) => {
  return await prisma.test.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          title: true,
          instructor: {
            select: {
              name: true,
            },
          },
        },
      },
      results: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const getTestsByCourse = async (courseId: string) => {
  return await prisma.test.findMany({
    where: { courseId },
    include: {
      _count: {
        select: {
          results: true,
        },
      },
    },
  });
};

export const updateTest = async (
  id: string,
  data: Partial<{
    title: string;
  }>,
) => {
  return await prisma.test.update({
    where: { id },
    data,
    include: {
      course: {
        select: {
          title: true,
        },
      },
    },
  });
};

export const deleteTest = async (id: string) => {
  return await prisma.test.delete({ where: { id } });
};
