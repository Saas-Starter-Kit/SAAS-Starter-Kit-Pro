//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);
import db from '../../Database/sql/db.js';

const createOrg = async (org_name, stripe_customer_id, subscription_id, plan_type) => {
  let text = `INSERT INTO organizations(org_name, stripe_customer_id, subscription_id, plan_type)
              VALUES ($1, $2, $3, $4)
              RETURNING id`;
  let values = [org_name, stripe_customer_id, subscription_id, plan_type];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

const clearDb = async () => {
  let text1 = `DELETE FROM roles`;
  let text2 = `DELETE FROM todos`;
  let text3 = `DELETE FROM users`;
  let text4 = `DELETE FROM organizations`;

  await db.query(text1);
  await db.query(text2);
  await db.query(text3);
  await db.query(text4);
};

afterEach(() => {
  clearDb();
});

describe('GET subscription info API /stripe/get-subscription', () => {
  it('get subscription info', async () => {
    let subId = 'sub3454wfd';
    await createOrg('org4545646', 'cus454frd45', subId, 'basic');

    let res = await request.get(`/stripe/get-subscription?subscription_id=${subId}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST create subscription API /stripe/create-subscription', () => {
  it('create subscription', async () => {
    let org = createOrg('org3345');

    let res = await request.post('/stripe/create-subscription').send({
      customer: 'custId123',
      email: 'example2@gmail.com',
      payment_method: 'paymentId123',
      planSelect: 199,
      planType: 'Basic',
      org_id: org.id
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST cancel subscription API /stripe/cancel-subscription', () => {
  it('Cancel subscription', async () => {
    let subId = 'sub34f4t5t';
    let org = await createOrg('org3456t5', 'cus3534tf', subId, 'basic');

    let res = await request.post('/stripe/cancel-subscription').send({
      org_id: org.id,
      email: 'email2334@example.com',
      subscription_id: subId
    });

    expect(res.status).toEqual(200);
  });
});

describe('POST update subscription API /stripe/update-subscription', () => {
  it('update subscription with new plan', async () => {
    let res = await request.put('/stripe/update-subscription').send({
      email: 'example4@gmail.com',
      subscription_id: 'subscriptionId1223',
      payment_method: 'payment_method123',
      planSelect: 299,
      subscriptionItem: 'subscriptionItem134',
      plan_type: 'basic'
    });

    expect(res.status).toEqual(200);
  });
});
