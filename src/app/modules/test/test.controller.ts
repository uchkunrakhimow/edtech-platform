import { Router } from 'express';
import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getTestsByCourse,
} from './test.service';
import {
  sendCreatedResponse,
  sendSuccessResponse,
  sendNotFoundResponse,
  sendNoContentResponse,
} from '@helpers/responseHandler';
import {
  createTestValidate,
  getAllTestsValidate,
  testIdValidate,
  updateTestValidate,
  testsByCourseValidate,
} from './test.validate';

const router = Router();

/**
 * @route POST /test
 * @desc Create test
 * @body {title, courseId}
 * @access Public
 */
router.post('/test', async (req, res, next) => {
  try {
    const body = createTestValidate.parse(req.body);
    const result = await createTest(body);
    sendCreatedResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /test
 * @desc Get all tests
 * @query {skip, take}
 * @access Public
 */
router.get('/test', async (req, res, next) => {
  try {
    const query = getAllTestsValidate.parse(req.query);
    const result = await getAllTests({
      skip: Number(query.skip),
      take: Number(query.take),
    });
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /test/:id
 * @desc Get test by id
 * @params {id}
 * @access Public
 */
router.get('/test/:id', async (req, res, next) => {
  try {
    const param = testIdValidate.parse(req.params);
    const test = await getTestById(param.id);

    if (!test) {
      sendNotFoundResponse(res, 'Test not found');
      return;
    }

    sendSuccessResponse(res, test);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /test/course/:courseId
 * @desc Get tests by course id
 * @params {courseId}
 * @access Public
 */
router.get('/test/course/:courseId', async (req, res, next) => {
  try {
    const param = testsByCourseValidate.parse(req.params);
    const tests = await getTestsByCourse(param.courseId);
    sendSuccessResponse(res, tests);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /test/:id
 * @desc Update test by id
 * @params {id}
 * @body {title}
 * @access Public
 */
router.put('/test/:id', async (req, res, next) => {
  try {
    const param = testIdValidate.parse(req.params);
    const body = updateTestValidate.parse(req.body);

    const test = await getTestById(param.id);

    if (!test) {
      sendNotFoundResponse(res, 'Test not found');
      return;
    }

    const result = await updateTest(param.id, body);
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /test/:id
 * @desc Delete test by id
 * @params {id}
 * @access Public
 */
router.delete('/test/:id', async (req, res, next) => {
  try {
    const param = testIdValidate.parse(req.params);

    const test = await getTestById(param.id);

    if (!test) {
      sendNotFoundResponse(res, 'Test not found');
      return;
    }

    await deleteTest(param.id);
    sendNoContentResponse(res);
  } catch (error) {
    next(error);
  }
});

export default router;
