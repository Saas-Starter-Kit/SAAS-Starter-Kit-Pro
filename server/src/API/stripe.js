import express from 'express';
const router = express.Router();

import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requireAuth } from '../Middleware/auth.js';

import {
  CreateSetupIntent,
  GetWallet,
  AttachPaymentMethod,
  RemovePaymentMethod
} from '../Services/stripe/stripeHelpers.js';

import {
  CancelSubscription,
  GetSubscription,
  CreateSubscription,
  UpdateSubscription
} from '../Services/stripe/stripeSubscription.js';

/* Helper Routes */
router.get('/get-wallet', asyncHandler(GetWallet));

router.post('/wallet', asyncHandler(CreateSetupIntent));

router.post('/remove-payment', asyncHandler(RemovePaymentMethod));

router.post('/attach-payment', asyncHandler(AttachPaymentMethod));

/* Subscription Routes */
router.get('/get-subscription', requireAuth, asyncHandler(GetSubscription));

router.post('/create-subscription', requireAuth, asyncHandler(CreateSubscription));

router.post('/cancel-subscription', requireAuth, asyncHandler(CancelSubscription));

router.put('/update-subscription', requireAuth, asyncHandler(UpdateSubscription));

export default router;
