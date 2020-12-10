import express from 'express';
const router = express.Router();

import { updateEmail, updateUsername, Login, SignUp } from '../Services/authentication.js';

//sign in or sign up user then send jwt token
router.post('/signup', SignUp);
router.post('/login', Login);

//update username
router.put('/put/username', updateUsername);

//update email
router.put('/put/email', updateEmail);

/*
JWT is sessionless, so logout only needs to be implemented
client side. 
*/

export default router;
