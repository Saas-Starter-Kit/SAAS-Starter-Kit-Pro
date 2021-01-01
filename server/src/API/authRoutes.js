import express from 'express';
const router = express.Router();

import { asyncHandler } from '../Utils/asyncErrorHandler.js';
import { updateEmail, updateUsername, Login, SignUp } from '../Services/auth/authentication.js';

//sign in or sign up user then send jwt token
router.post('/signup', asyncHandler(SignUp));
router.post('/login', asyncHandler(Login));

//update username
router.put('/put/username', asyncHandler(updateUsername));

//update email
router.put('/put/email', asyncHandler(updateEmail));

/*
JWT is sessionless, so logout only needs to be implemented
client side. 
*/

export default router;
