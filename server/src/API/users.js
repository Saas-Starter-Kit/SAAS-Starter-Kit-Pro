import express from 'express';
import { CreateContact } from '../Services/users/contacts.js';
import { GetAppUsers, InviteUser, VerifyInvite } from '../Services/users/users.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requireAuth } from '../Middleware/auth.js';
const router = express.Router();

/* Create contact in sendinblue */
router.post('/post/contact', asyncHandler(CreateContact));

/* Get all users associated with an app */
router.get('/get/app-users', requireAuth, asyncHandler(GetAppUsers));

/* Invite a user to the app */
router.post('/users/invite', requireAuth, asyncHandler(InviteUser));

/* Verify Invite */
router.post('/users/verify-invite', asyncHandler(VerifyInvite));

export default router;
