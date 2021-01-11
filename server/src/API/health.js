import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';
import { sendEmail } from '../Services/utils/emailTest.js';

import { asyncHandler } from '../Utils/asyncErrorHandler.js';

/* Health Routes */

router.get('/fail-health', asyncHandler(failHealthCheck));

router.get('/send-email', asyncHandler(sendEmail));

//Example of authenticated route
router.get('/private', requireAuth, asyncHandler(privateRoute));

/* 
    DO NOT MODIFY, '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

router.get('/health', asyncHandler(_healthCheck));

export default router;
