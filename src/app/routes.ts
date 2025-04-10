import { Router } from 'express';
import verifyMiddleware from '@middlewares/verify.middleware';
import userRoute from '@modules/user/user.controller';
import courseRoute from '@modules/course/course.controller';
import enrollmentRoute from '@modules/enrollment/enrollment.controller';
import testRoute from '@modules/test/test.controller';
import testResultRoute from '@modules/testResult/test-result.controller';
import authRoute from '@modules/auth/auth.controller';

const router = Router();

const apiRoutes = [
  userRoute,
  courseRoute,
  enrollmentRoute,
  testRoute,
  testResultRoute,
];
apiRoutes.forEach((route) => router.use('/api', verifyMiddleware, route));

router.use('/auth', authRoute);

export default router;
