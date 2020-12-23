import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { healthCheck, privateRoute, failHealthCheck } from '../Services/health.js';

router.get('/health', healthCheck);

router.get('/fail-health', failHealthCheck);

//Example of authenticated route
router.get('/private', requireAuth, privateRoute);

export default router;
