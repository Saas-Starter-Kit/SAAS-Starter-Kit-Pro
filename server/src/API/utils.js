import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';
import { sendEmail } from '../Services/utils/emailTest.js';
import { asyncHandler } from '../Utils/asyncErrorHandler.js';
import { requirePermissions } from '../Config/permissions.js';

//intentionally fail health check for development/testing
router.get('/fail-health', asyncHandler(failHealthCheck));

//test email templates without sending them to real users
router.get('/send-email', asyncHandler(sendEmail));

//Example of authenticated route, use for development/testing
router.get('/private/auth', requireAuth, asyncHandler(privateRoute));
router.post('/private/auth', requireAuth, asyncHandler(privateRoute));

//Example of permissions route, use for development/testing
router.get('/private/permissions', requirePermissions, asyncHandler(privateRoute));
router.post('/private/permissions', requirePermissions, asyncHandler(privateRoute));

//Example of authenticated and permissions route
router.get('/private/authpermissions', requireAuth, requirePermissions, asyncHandler(privateRoute));

/* 
    DO NOT MODIFY is using AWS, '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

router.get('/health', asyncHandler(_healthCheck));

export default router;
