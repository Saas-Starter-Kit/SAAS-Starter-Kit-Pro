import express from 'express';
const router = express.Router();

import { CreateCustomer } from '../Services/stripeCustomer.js';

import {
  CreateSetupIntent,
  GetWallet,
  AttachPaymentMethod,
  RemovePaymentMethod
} from '../Services/stripeHelpers.js';

import {
  CancelSubscription,
  GetSubscription,
  CreateSubscription
} from '../Services/stripeSubscription';

/* Helper Routes */
router.get('/get-wallet', GetWallet);

router.post('/wallet', CreateSetupIntent);

router.post('/remove-payment', RemovePaymentMethod);

router.post('/attach-payment', AttachPaymentMethod);

/* Subscription Routes */
router.get('/get-subscription', GetSubscription);

router.post('/subscription', CreateSubscription);

router.post('/cancel-subscription', CancelSubscription);

/* Customer Routers */
router.post('/customer', CreateCustomer);

export default router;
