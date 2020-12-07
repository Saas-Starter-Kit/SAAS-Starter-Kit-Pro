const stripe = require('stripe')(process.env.StripeSecret);

module.exports = stripe;
