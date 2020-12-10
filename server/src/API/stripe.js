import express from 'express';
const router = express.Router();

import { requireAuth } from '../Config/passport.js';
import { healthCheck, privateRoute } from '../Services/health.js';

router.get('/health', healthCheck);

//Example of authenticated route
router.get('/private', requireAuth, privateRoute);

export default router;
