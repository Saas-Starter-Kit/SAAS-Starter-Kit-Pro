import express from 'express';
import { CreateContact } from '../Services/users/contacts.js';
import { GetAppUsers, InviteUser } from '../Services/users/users.js';

const router = express.Router();

/* Create contact in sendinblue */
router.post('/post/contact', CreateContact);

/* Get all users associated with an app */
router.get('/get/app-users', GetAppUsers);

/* Invite a user to the app */
router.post('/users/invite', InviteUser);

export default router;
