import express from 'express';
const router = express.Router();

import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { WebHookHandler } from '../Services/stripe/stripeWebhooksHanlder.js';

/* Webhook Routes */
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  asyncHandler(WebHookHandler)
);

export default router;
