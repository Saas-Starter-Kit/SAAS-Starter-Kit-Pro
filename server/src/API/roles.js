import express from 'express';
import { getRole, postRole } from '../Services/App/roles.js';

const router = express.Router();

/* Get role */
router.get('/get/role', getRole);

/* Post role */
router.post('/post/role', postRole);

export default router;
