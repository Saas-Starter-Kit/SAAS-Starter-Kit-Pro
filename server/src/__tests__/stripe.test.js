//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
import expect from 'expect';
const request = supertest(server)

describe('GET wallet info API /stripe/get-wallet', () => {
    it('get wallet info', async () => {
        let res = await request
            .get('/stripe/get-wallet?customer=custId123') // pass original customer id
        expect(res.status).toEqual(200)
    });
})

describe('POST new wallet info API /wallet', () => {
    it('create a new wallet', async () => {
        let res = await request
            .post('/stripe/wallet')
            .send({
                customer: {
                    stripeCustomerKey: 'custId123' // pass original customer id
                }
            })

        expect(res.status).toEqual(200)
    });
})


describe('POST remove payment API /remove-payment', () => {
    it('Remove payment method', async () => {
        let res = await request
            .post('/stripe/remove-payment')
            .send({
                payment: 'paymentId123' // actual paymentId need to pass
            })
        expect(res.status).toEqual(200)
    });
})


describe('POST add payment method API /attach-payment', () => {
    it('Add payment method', async () => {
        let res = await request
            .post('/stripe/attach-payment')
            .send({
                customer: {
                    stripeCustomerKey: 'custId123'
                },
                payment_method: 'paymentId123' // actual paymentId need to pass
            })
        expect(res.status).toEqual(200)
    });
})

describe('GET payment info API /stripe/payment-intent', () => {
    it('get payment intent', async () => {
        let res = await request
            .get('/stripe/payment-intent')
        expect(res.status).toEqual(200)
    });
})

describe('GET subscription info API /stripe/get-subscription', () => {
    it('get subscription info', async () => {
        let res = await request
            .get('/stripe/get-subscription?email=k1424sap@gmail.com') // pass user email
        expect(res.status).toEqual(200)
    });
})

describe('POST create subscription API /stripe/create-subscription', () => {
    it('Add payment method', async () => {
        let res = await request
            .post('/stripe/create-subscription')
            .send({
                customer: {
                    stripeCustomerKey: 'custId123',
                    email: 'k1424sap@gmail.com'
                },
                payment_method: 'paymentId123', // actual paymentId need to pass
                planSelect: 199, // pass default plan

            })
        expect(res.status).toEqual(200)
    });
})

describe('POST cancel subscription API /stripe/cancel-subscription', () => {
    it('Cancel subscription', async () => {
        let res = await request
            .post('/stripe/cancel-subscription')
            .send({
                email: 'k1424sap@gmail.com'
            })
        expect(res.status).toEqual(200)
    });
})

describe('POST update subscription API /stripe/update-subscription', () => {
    it('update subscription with new plan', async () => {
        let res = await request
            .put('/stripe/update-subscription')
            .send({
                email: 'k1424sap@gmail.com',
                subscriptionId: 'subscriptionId1223', // pass actual subscriptionId
                payment_method: 'payment_method123', // pass actual payment_method
                planSelect: 299, // pass new plan
                subscriptionItem: 'subscriptionItem134',
                planType: 'monthly',
            })

        expect(res.status).toEqual(200)
    });
})

describe('POST create customer API /stripe/create-customer', () => {
    it('create new customer and update stripe details', async () => {
        let res = await request
            .post('/stripe/create-customer')
            .send({
                email: 'k1424sap@gmail.com',
                userId: 'userId1234'
            })
        expect(res.status).toEqual(200)
    });
})

describe('POST one time pay to user API /stripe/one-time-pay', () => {
    it('create one time payment for user', async () => {
        let res = await request
            .post('/stripe/one-time-pay')
            .send({
                receipt_email: 'k1424sap@gmail.com',
                amount: 199
            })
        expect(res.status).toEqual(200)
    });
})
