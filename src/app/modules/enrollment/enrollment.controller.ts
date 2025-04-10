import { Router } from 'express';
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  checkExistingEnrollment,
} from './enrollment.service';
import {
  sendCreatedResponse,
  sendSuccessResponse,
  sendNotFoundResponse,
  sendConflictResponse,
} from '@helpers/responseHandler';
import {
  createEnrollmentValidate,
  getAllEnrollmentsValidate,
  enrollmentIdValidate,
} from './enrollment.validate';

const router = Router();

/**
 * @route POST /enrollment
 * @desc Create enrollment
 * @body {userId, courseId}
 * @access Public
 */
router.post('/enrollment', async (req, res, next) => {
  try {
    const body = createEnrollmentValidate.parse(req.body);

    // Check if enrollment already exists
    const existingEnrollment = await checkExistingEnrollment(
      body.userId,
      body.courseId,
    );
    if (existingEnrollment) {
      sendConflictResponse(res, 'User is already enrolled in this course');
      return;
    }

    const result = await createEnrollment(body);
    sendCreatedResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /enrollment
 * @desc Get all enrollments
 * @query {skip, take, userId, courseId}
 * @access Public
 */
router.get('/enrollment', async (req, res, next) => {
  try {
    const query = getAllEnrollmentsValidate.parse(req.query);
    const result = await getAllEnrollments({
      skip: Number(query.skip),
      take: Number(query.take),
      userId: query.userId,
      courseId: query.courseId,
    });
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /enrollment/:id
 * @desc Get enrollment by id
 * @params {id}
 * @access Public
 */
router.get('/enrollment/:id', async (req, res, next) => {
  try {
    const param = enrollmentIdValidate.parse(req.params);
    const enrollment = await getEnrollmentById(param.id);

    if (!enrollment) {
      sendNotFoundResponse(res, 'Enrollment not found');
      return;
    }

    sendSuccessResponse(res, enrollment);
  } catch (error) {
    next(error);
  }
});

export default router;
