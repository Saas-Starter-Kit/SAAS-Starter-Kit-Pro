import express from 'express';
const router = express.Router();

import {
  CreateCustomer,
  CreateSetupIntent,
  CreateSubscription,
  GetCustomer
} from '../Services/stripe.js';

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

router.get('/getsub', GetCustomer);

export default router;
