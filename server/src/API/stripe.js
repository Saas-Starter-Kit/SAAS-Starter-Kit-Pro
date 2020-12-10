import express from 'express';
const router = express.Router();

import { CreateCustomer, CreateSetupIntent } from '../Services/stripe.js';

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

export default router;
