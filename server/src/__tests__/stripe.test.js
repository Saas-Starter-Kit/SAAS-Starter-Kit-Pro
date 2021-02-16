//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';
import expect from 'expect';
const request = supertest(server);

describe('GET subscription info API /stripe/get-subscription', () => {
  it('get subscription info', async () => {
    let res = await request.get('/stripe/get-subscription?email=k1424sap@gmail.com');
    expect(res.status).toEqual(200);
  });
});

describe('POST create subscription API /stripe/create-subscription', () => {
  it('Add payment method', async () => {
    let res = await request.post('/stripe/create-subscription').send({
      customer: {
        stripeCustomerKey: 'custId123',
        email: 'k1424sap@gmail.com'
      },
      payment_method: 'paymentId123',
      planSelect: 199
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST cancel subscription API /stripe/cancel-subscription', () => {
  it('Cancel subscription', async () => {
    let res = await request.post('/stripe/cancel-subscription').send({
      email: 'k1424sap@gmail.com'
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST update subscription API /stripe/update-subscription', () => {
  it('update subscription with new plan', async () => {
    let res = await request.put('/stripe/update-subscription').send({
      email: 'k1424sap@gmail.com',
      subscriptionId: 'subscriptionId1223',
      payment_method: 'payment_method123',
      planSelect: 299,
      subscriptionItem: 'subscriptionItem134',
      planType: 'monthly'
    });

    expect(res.status).toEqual(200);
  });
});

describe('POST create customer API /stripe/create-customer', () => {
  it('create new customer and update stripe details', async () => {
    let res = await request.post('/stripe/create-customer').send({
      email: 'k1424sap@gmail.com',
      userId: 'userId1234'
    });
    expect(res.status).toEqual(200);
  });
});


