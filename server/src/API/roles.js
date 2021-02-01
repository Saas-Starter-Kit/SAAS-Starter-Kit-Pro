import express from 'express';
import { getRole, postRole, deleteRole } from '../Services/roles/roles.js';

const router = express.Router();

/* Get role */
router.get('/get/role', getRole);

/* Delete user role */
router.delete('/delete/role', deleteRole);

/* Post role */
router.post('/post/role', postRole);

export default router;
