import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { _healthCheck, privateRoute, failHealthCheck } from '../Services/utils/health.js';

router.get('/fail-health', failHealthCheck);

//Example of authenticated route
router.get('/private', requireAuth, privateRoute);

/* 
    DO NOT MODIFY, '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

router.get('/health', _healthCheck);

export default router;
