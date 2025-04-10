import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async (data: {
  title: string;
  description: string;
  price: number;
  videoCount: number;
  duration: number;
  instructorId: string;
}) => {
  return await prisma.course.create({
    data: {
      ...data,
      viewCount: 0,
    },
  });
};

export const getAllCourses = async ({
  skip,
  take,
  instructorId,
  searchTerm,
}: {
  skip: number;
  take: number;
  instructorId?: string;
  searchTerm?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (instructorId) {
    where.instructorId = instructorId;
  }

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      skip,
      take,
      where,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            tests: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.course.count({ where }),
  ]);

  return {
    courses,
    totalCount,
    totalPages: Math.ceil(totalCount / take),
    currentPage: Math.floor(skip / take) + 1,
  };
};

export const getCourseById = async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tests: true,
      _count: {
        select: {
          enrollments: true,
          tests: true,
        },
      },
    },
  });
};

export const getExistsCourse = async (title: string, instructorId: string) => {
  return await prisma.course.findFirst({
    where: {
      title,
      instructorId,
    },
  });
};

export const updateCourse = async (
  id: string,
  data: Partial<{
    title?: string;
    description?: string;
    price?: number;
    videoCount?: number;
    duration?: number;
    viewCount?: number;
  }>,
) => {
  return await prisma.course.update({
    where: { id },
    data,
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const incrementViewCount = async (id: string) => {
  return await prisma.course.update({
    where: { id },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
};

export const deleteCourse = async (id: string) => {
  return await prisma.course.delete({ where: { id } });
};

export const getPopularCourses = async (limit: number = 5) => {
  return await prisma.course.findMany({
    take: limit,
    orderBy: {
      viewCount: 'desc',
    },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });
};
