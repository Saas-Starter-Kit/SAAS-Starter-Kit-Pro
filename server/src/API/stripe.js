import express from 'express';
const router = express.Router();

import { CreateCustomer, CreateSetupIntent, CreateSubscription } from '../Services/stripe.js';

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

export default router;
