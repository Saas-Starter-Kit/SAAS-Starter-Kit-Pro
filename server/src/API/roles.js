import express from 'express';
import { getRole, createRole, deleteRole } from '../Services/roles/roles.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requirePermissions } from '../Middleware/permissions.js';
import { requireAuth } from '../Middleware/auth.js';

const router = express.Router();

/* Get role */
router.get('/get/role', asyncHandler(getRole));

/* Delete user role */
router.delete(
  '/delete/role',
  requireAuth,
  requirePermissions('remove', 'user'),
  asyncHandler(deleteRole)
);

/* Post role */
router.post('/post/role', asyncHandler(createRole));

export default router;
