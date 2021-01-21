import express from 'express';
import { getApp, postApp, deleteApp } from '../Services/app/app.js';

const router = express.Router();

/* Get app */
router.get('/get/app', getApp);

/* Post app */
router.post('/post/app', postApp);

/* Delete app */
router.delete('/delete/app', deleteApp);

export default router;
