import express from 'express';
import { CreateOrg, GetOrgs, DeleteOrg, PutOrg } from '../Services/org/org.js';
import { requirePermissions } from '../Middleware/permissions.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requireAuth } from '../Middleware/auth.js';

const router = express.Router();

/* Create Org */
router.post('/org', requireAuth, asyncHandler(CreateOrg));

/* Get Users Orgs */
router.get('/org', requireAuth, asyncHandler(GetOrgs));

/* Get Users Orgs */
router.delete('/org', requireAuth, requirePermissions('delete', 'org'), asyncHandler(DeleteOrg));

/* Update Org */
router.put('/org', requireAuth, asyncHandler(PutOrg));

export default router;
