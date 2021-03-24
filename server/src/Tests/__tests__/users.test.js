import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);
import db from '../../Database/sql/db.js';

export const CreateInvite = async (org_id, randomBytes, recipient_email, sender_email) => {
  let text = `INSERT INTO invites(org_id, verify_key, recipient_email, sender_email)
              VALUES($1, $2, $3, $4)`;

  let values = [org_id, randomBytes, recipient_email, sender_email];

  await db.query(text, values);

  return;
};

const createOrg = async (org_name) => {
  let text = `INSERT INTO organizations(org_name)
              VALUES ($1)
              RETURNING id`;
  let values = [org_name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

const clearDb = async () => {
  let text1 = `DELETE FROM roles`;
  let text2 = `DELETE FROM todos`;
  let text3 = `DELETE FROM users`;
  let text4 = `DELETE FROM organizations`;
  let text5 = `DELETE FROM invites`;

  await db.query(text1);
  await db.query(text2);
  await db.query(text3);
  await db.query(text4);
  await db.query(text4);
  await db.query(text5);
};

afterEach(() => {
  clearDb();
});

describe('GET app users info /get/app-users', () => {
  it('get app users info with org id', async () => {
    let org_id = 'ea97be5c-53fb-476a-b1cb-7e56154c6429';

    let res = await request.get(`/api/get/app-users?org_id=${org_id}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST create user app invite /users/invite', () => {
  it('create a user invite', async () => {
    let org = createOrg('org34545');

    let res = await request.post(`/api/users/invite`).send({
      sender_email: 'Example2335r@example.com',
      sender_display_name: 'username34345',
      recipient_email: 'example34354@example.com',
      domainUrl: 'http://dsdfdf.com',
      org_id: org.id
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST verify a user invite /users/verify-invite', () => {
  it('verify a user invite', async () => {
    let invite_key = 'ljfghbrlk54354';
    let org = createOrg('org34545');

    await CreateInvite(org.id, invite_key, 'example234435@yahoo.com', 'example2343@yahoo.com');

    let res = await request.post('/api/users/verify-invite').send({
      invite_key
    });
    expect(res.status).toEqual(200);
  });
});
