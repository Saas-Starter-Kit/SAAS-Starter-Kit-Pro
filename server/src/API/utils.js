import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';
import { sendEmail } from '../Services/utils/emailTest.js';
import { Permissions } from '../Services/utils/permissionsTest.js';
import { asyncHandler } from '../Utils/asyncErrorHandler.js';

//Permission Based Route
router.post('/permissions', asyncHandler(Permissions));
router.get('/permissions', asyncHandler(Permissions));

//Health Routes
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
