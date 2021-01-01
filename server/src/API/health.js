import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';

import { asyncHandler } from '../Utils/asyncErrorHandler.js';

router.get('/fail-health', asyncHandler(failHealthCheck));

//Example of authenticated route
router.get('/private', requireAuth, asyncHandler(privateRoute));

/* 
    DO NOT MODIFY, '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

router.get('/health', asyncHandler(_healthCheck));

export default router;
