import express from 'express';
const router = express.Router();
import { raw } from 'body-parser';

import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { WebHookHandler } from '../Services/stripe/stripeWebhooksHanlder.js';

/* Webhook Routes */
router.post('/stripe-webhook', raw({ type: 'application/json' }), asyncHandler(WebHookHandler));

export default router;
