import express from 'express';
import { CreateOrg, GetOrgs, DeleteOrg, PutOrg } from '../Services/org/org.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';

const router = express.Router();

/* Create Org */
router.post('/org', asyncHandler(CreateOrg));

/* Get Users Orgs */
router.get('/org', asyncHandler(GetOrgs));

/* Get Users Orgs */
router.delete('/org', asyncHandler(DeleteOrg));

/* Update Org */
router.put('/org', asyncHandler(PutOrg));

export default router;
