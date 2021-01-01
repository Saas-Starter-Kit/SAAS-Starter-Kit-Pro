import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';

import { asyncHandler } from '../Utils/asyncErrorHandler.js';
import { WebHookHandler } from '../Services/stripe/stripeWebhooksHanlder.js';

/* Webhook Routes */
router.post(
  '/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  asyncHandler(WebHookHandler)
);

export default router;
