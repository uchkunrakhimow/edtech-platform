import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getExistsCourse,
  getPopularCourses,
  incrementViewCount,
  updateCourse,
} from './course.service';
import {
  sendConflictResponse,
  sendCreatedResponse,
  sendNoContentResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
} from '@helpers/responseHandler';
import {
  courseIdValidate,
  createCourseValidate,
  getAllCoursesValidate,
  updateCourseValidate,
} from './course.validate';
import { getUserById } from '../user/user.service';
const router = Router();

/**
 * @route POST /course
 * @desc Create course
 * @body {title, description, price, videoCount, duration, instructorId}
 * @access Public
 */
router.post('/course', async (req, res, next) => {
  try {
    const body = createCourseValidate.parse(req.body);

    // Check if instructor exists
    const instructor = await getUserById(body.instructorId);
    if (!instructor) {
      sendNotFoundResponse(res, 'Instructor not found');
      return;
    }

    // Check if course with same title from same instructor exists
    const existsCourse = await getExistsCourse(body.title, body.instructorId);
    if (existsCourse) {
      sendConflictResponse(
        res,
        'Course with this title already exists for this instructor',
      );
      return;
    }

    const result = await createCourse(body);
    sendCreatedResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /course
 * @desc Get all courses
 * @query {skip, take, instructorId, searchTerm}
 * @access Public
 */
router.get('/course', async (req, res, next) => {
  try {
    const query = getAllCoursesValidate.parse(req.query);

    const result = await getAllCourses({
      skip: Number(query.skip),
      take: Number(query.take),
      instructorId: query.instructorId,
      searchTerm: query.searchTerm,
    });

    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /course/popular
 * @desc Get popular courses
 * @query {limit}
 * @access Public
 */
router.get('/course/popular', async (req, res, next) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const result = await getPopularCourses(limit);
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /course/:id
 * @desc Get course by id
 * @params {id}
 * @access Public
 */
router.get('/course/:id', async (req, res, next) => {
  try {
    const param = courseIdValidate.parse(req.params);

    const course = await getCourseById(param.id);
    if (!course) {
      sendNotFoundResponse(res, 'Course not found');
      return;
    }

    // Increment view count
    await incrementViewCount(param.id);

    sendSuccessResponse(res, course);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /course/:id
 * @desc Update course by id
 * @params {id}
 * @body {title, description, price, videoCount, duration}
 * @access Public
 */
router.put('/course/:id', async (req, res, next) => {
  try {
    const param = courseIdValidate.parse(req.params);
    const body = updateCourseValidate.parse(req.body);

    // Check if course exists
    const course = await getCourseById(param.id);
    if (!course) {
      sendNotFoundResponse(res, 'Course not found');
      return;
    }

    // If updating title, check for duplicate
    if (body.title && body.title !== course.title) {
      const existsCourse = await getExistsCourse(
        body.title,
        course.instructorId,
      );
      if (existsCourse) {
        sendConflictResponse(
          res,
          'Course with this title already exists for this instructor',
        );
        return;
      }
    }

    const result = await updateCourse(param.id, body);
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /course/:id
 * @desc Delete course by id
 * @params {id}
 * @access Public
 */
router.delete('/course/:id', async (req, res, next) => {
  try {
    const param = courseIdValidate.parse(req.params);

    // Check if course exists
    const course = await getCourseById(param.id);
    if (!course) {
      sendNotFoundResponse(res, 'Course not found');
      return;
    }

    await deleteCourse(param.id);
    sendNoContentResponse(res);
  } catch (error) {
    next(error);
  }
});

export default router;
