import express from 'express';
import { CreateOrg } from '../Services/org/org.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';

const router = express.Router();

/* Create Org */
router.post('/create-org', asyncHandler(CreateOrg));

export default router;
