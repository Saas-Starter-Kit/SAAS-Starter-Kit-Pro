import express from 'express';
const router = express.Router();

import {
  CreateCustomer,
  CreateSetupIntent,
  CreateSubscription,
  CancelSubscription,
  GetWallet,
  AttachPaymentMethod
} from '../Services/stripe.js';

router.get('/attach-payment', AttachPaymentMethod);

router.get('/get-wallet', GetWallet);

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

router.post('/cancel-subscription', CancelSubscription);

export default router;
