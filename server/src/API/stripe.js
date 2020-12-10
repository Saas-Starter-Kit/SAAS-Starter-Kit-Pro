import express from 'express';
const router = express.Router();

import { CreateCustomer } from '../Services/stripe.js';

router.get('/customer', CreateCustomer);

export default router;
