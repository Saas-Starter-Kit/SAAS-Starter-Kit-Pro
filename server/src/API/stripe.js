import express from 'express';
const router = express.Router();

import {
  CreateCustomer,
  CreateSetupIntent,
  CreateSubscription,
  CancelSubscription,
  GetWallet,
  AttachPaymentMethod,
  RemovePaymentMethod,
  GetSubscription
} from '../Services/stripe.js';

router.get('/get-wallet', GetWallet);

router.get('/get-subscription', GetSubscription);

router.post('/remove-payment', RemovePaymentMethod);

router.post('/attach-payment', AttachPaymentMethod);

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

router.post('/cancel-subscription', CancelSubscription);

export default router;
