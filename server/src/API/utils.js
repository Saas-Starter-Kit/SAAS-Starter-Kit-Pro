import express from 'express';
const router = express.Router();

import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';
import { sendEmail } from '../Services/utils/emailTest.js';

import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requirePermissions } from '../Middleware/permissions.js';
import { requireAuth } from '../Middleware/auth.js';

//intentionally fail health check for development/testing
router.get('/fail-health', asyncHandler(failHealthCheck));

//test email templates without sending them to real users
router.get('/send-email', asyncHandler(sendEmail));

//Example of authenticated route, use for development/testing
router.get('/private/auth', requireAuth, asyncHandler(privateRoute));
router.post('/private/auth', requireAuth, asyncHandler(privateRoute));

//Example of permissions route, use for development/testing
router.post('/private/permissions', requirePermissions('read', 'data'), asyncHandler(privateRoute));

//Example of authenticated and permissions route
router.get(
  '/private/authpermissions',
  requireAuth,
  requirePermissions('read', 'data'),
  asyncHandler(privateRoute)
);

/* 
    DO NOT MODIFY. Used by AWS. '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

router.get('/health', asyncHandler(_healthCheck));

export default router;
