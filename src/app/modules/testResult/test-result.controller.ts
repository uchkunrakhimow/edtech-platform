import { Router } from 'express';
import {
  createTestResult,
  deleteTestResult,
  getAllTestResults,
  getTestResultById,
  getTestResultByUserAndTest,
  updateTestResult,
} from './test-result.service';
import {
  sendConflictResponse,
  sendCreatedResponse,
  sendNoContentResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
} from '@helpers/responseHandler';
import {
  createTestResultValidate,
  getAllTestResultsValidate,
  testResultIdValidate,
  updateTestResultValidate,
} from './test-result.validate';
import { getUserById } from '../user/user.service';
import { getTestById } from '../test/test.service';

const router = Router();

/**
 * @route POST /test-result
 * @desc Create test result
 * @body {userId, testId, score}
 * @access Public
 */
router.post('/test-result', async (req, res, next) => {
  const body = createTestResultValidate.parse(req.body);
  try {
    // Check if user exists
    const user = await getUserById(body.userId);
    if (!user) {
      sendNotFoundResponse(res, 'User not found');
      return;
    }

    // Check if test exists
    const test = await getTestById(body.testId);
    if (!test) {
      sendNotFoundResponse(res, 'Test not found');
      return;
    }

    // Check if test result already exists
    const existingResult = await getTestResultByUserAndTest(
      body.userId,
      body.testId,
    );
    if (existingResult) {
      sendConflictResponse(
        res,
        'Test result already exists for this user and test',
      );
      return;
    }

    const result = await createTestResult(body);
    sendCreatedResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /test-result
 * @desc Get all test results
 * @query {skip, take, userId, testId}
 * @access Public
 */
router.get('/test-result', async (req, res, next) => {
  const query = getAllTestResultsValidate.parse(req.query);
  try {
    const result = await getAllTestResults({
      skip: Number(query.skip),
      take: Number(query.take),
      userId: query.userId,
      testId: query.testId,
    });
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /test-result/:id
 * @desc Get test result by id
 * @params {id}
 * @access Public
 */
router.get('/test-result/:id', async (req, res, next) => {
  const param = testResultIdValidate.parse(req.params);
  try {
    const testResult = await getTestResultById(param.id);

    if (!testResult) {
      sendNotFoundResponse(res, 'Test result not found');
      return;
    }

    sendSuccessResponse(res, testResult);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /test-result/:id
 * @desc Update test result by id
 * @params {id}
 * @body {score}
 * @access Public
 */
router.put('/test-result/:id', async (req, res, next) => {
  const param = testResultIdValidate.parse(req.params);
  const body = updateTestResultValidate.parse(req.body);
  try {
    const testResult = await getTestResultById(param.id);

    if (!testResult) {
      sendNotFoundResponse(res, 'Test result not found');
      return;
    }

    const result = await updateTestResult(param.id, body);
    sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /test-result/:id
 * @desc Delete test result by id
 * @params {id}
 * @access Public
 */
router.delete('/test-result/:id', async (req, res, next) => {
  const param = testResultIdValidate.parse(req.params);
  try {
    const testResult = await getTestResultById(param.id);

    if (!testResult) {
      sendNotFoundResponse(res, 'Test result not found');
      return;
    }

    await deleteTestResult(param.id);
    sendNoContentResponse(res);
  } catch (error) {
    next(error);
  }
});

export default router;
