import express from 'express';
const router = express.Router();

import { CreateCustomer } from '../Services/stripeCustomer.js';
import { asyncHandler } from '../Utils/asyncErrorHandler.js';

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
} from '../Services/stripeSubscription.js';

/* Helper Routes */
router.get('/get-wallet', asyncHandler(GetWallet));

router.post('/wallet', asyncHandler(CreateSetupIntent));

router.post('/remove-payment', asyncHandler(RemovePaymentMethod));

router.post('/attach-payment', asyncHandler(AttachPaymentMethod));

/* Subscription Routes */
router.get('/get-subscription', asyncHandler(GetSubscription));

router.post('/create-subscription', asyncHandler(CreateSubscription));

router.post('/cancel-subscription', asyncHandler(CancelSubscription));

/* Customer Routers */
router.post('/create-customer', asyncHandler(CreateCustomer));

export default router;
