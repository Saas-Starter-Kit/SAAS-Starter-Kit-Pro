import express from 'express';
import { getApp, postApp, deleteApp } from '../Services/app/app.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';

const router = express.Router();

/* Get app */
router.get('/get/app', asyncHandler(getApp));

/* Post app */
router.post('/post/app', asyncHandler(postApp));

/* Delete app */
router.delete('/delete/app', asyncHandler(deleteApp));

export default router;
