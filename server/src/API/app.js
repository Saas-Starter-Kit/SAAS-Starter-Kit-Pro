import express from 'express';
import { getApp, postApp, putApp, deleteApp } from '../Services/app/app.js';

const router = express.Router();

/* Get app */
router.get('/get/app', getApp);

/* Post app */
router.post('/post/app', postApp);

/* Edit app */
router.put('/put/app', putApp);

/* Delete app */
router.delete('/delete/app', deleteApp);

export default router;
