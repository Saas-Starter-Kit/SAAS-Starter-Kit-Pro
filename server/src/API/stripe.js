import express from 'express';
const router = express.Router();

import {
  CreateCustomer,
  CreateSetupIntent,
  CreateSubscription,
  CancelSubscription,
  GetWallet,
  AttachPaymentMethod,
  RemovePaymentMethod
} from '../Services/stripe.js';

router.get('/get-wallet', GetWallet);

router.post('/remove-payment', RemovePaymentMethod);

router.post('/attach-payment', AttachPaymentMethod);

router.post('/attach-payment', AttachPaymentMethod);

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

router.post('/cancel-subscription', CancelSubscription);

export default router;
