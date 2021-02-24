//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);
import db from '../../Database/sql/db.js';

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      customers: {
        list: () => {
          return { data: [] };
        },
        create: () => {
          return { id: 'cus245fedf' };
        },
        update: () => {}
      },
      paymentMethods: { attach: () => {} },
      subscriptions: {
        create: () => {
          return {
            id: 1,
            status: 'succeeded',
            plan: { amount: 10 }
          };
        },
        del: () => {
          return { status: 'canceled' };
        },
        update: () => {
          return { plan: 'plan1' };
        }
      }
    };
  });
});

const clearAppDb = async () => {
  let text1 = `DELETE FROM roles`;
  let text2 = `DELETE FROM todos`;
  let text3 = `DELETE FROM apps`;
  let text4 = `DELETE FROM users`;

  await db.query(text1);
  await db.query(text2);
  await db.query(text3);
  await db.query(text4);
};

afterAll(() => {
  clearAppDb();
});

const createUser = async (email, username, stripeId, subId) => {
  let text = `INSERT INTO users (email, username, stripe_customer_id, subscription_id)
              VALUES($1, $2, $3, $4)
              RETURNING email`;
  let values = [email, username, stripeId, subId];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

describe('POST create customer API /stripe/create-customer', () => {
  it('create new customer and update stripe details', async () => {
    let res = await request.post('/stripe/create-customer').send({
      email: 'example12@gmail.com',
      userId: 'userId1234'
    });
    expect(res.status).toEqual(200);
  });
});

describe('GET subscription info API /stripe/get-subscription', () => {
  it('get subscription info', async () => {
    await createUser('example133@gmail.com', 'username13', 'cus244id');

    let res = await request.get('/stripe/get-subscription?email=example133@gmail.com');
    expect(res.status).toEqual(200);
  });
});

describe('POST create subscription API /stripe/create-subscription', () => {
  it('create subscription', async () => {
    let res = await request.post('/stripe/create-subscription').send({
      customer: {
        stripeCustomerKey: 'custId123',
        email: 'example2@gmail.com'
      },
      payment_method: 'paymentId123',
      planSelect: 199
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST cancel subscription API /stripe/cancel-subscription', () => {
  it('Cancel subscription', async () => {
    let user = await createUser('example51@gmail.com', 'username3', 'cus3234ID', 'subId35445');

    let res = await request.post('/stripe/cancel-subscription').send({
      email: user.email
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST update subscription API /stripe/update-subscription', () => {
  it('update subscription with new plan', async () => {
    let res = await request.put('/stripe/update-subscription').send({
      email: 'example4@gmail.com',
      subscriptionId: 'subscriptionId1223',
      payment_method: 'payment_method123',
      planSelect: 299,
      subscriptionItem: 'subscriptionItem134',
      planType: 'monthly'
    });

    expect(res.status).toEqual(200);
  });
});
