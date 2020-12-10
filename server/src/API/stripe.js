import express from 'express';
const router = express.Router();

import { CreateCustomer } from '../Services/stripe.js';

router.post('/customer', CreateCustomer);

export default router;
