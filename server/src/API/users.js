import express from 'express';
import { CreateContact } from '../Services/users/contacts.js';
import { GetAppUsers } from '../Services/users/users.js';

const router = express.Router();

/* Create contact in sendinblue */
router.post('/post/contact', CreateContact);

/* Get all users associated with an app */
router.get('/get/users', GetAppUsers);

export default router;
