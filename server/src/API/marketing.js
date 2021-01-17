import express from 'express';
import { CreateContact } from '../Services/marketing/contacts.js';

const router = express.Router();

/* Create contact in sendinblue */
router.post('/post/contact', CreateContact);

export default router;
