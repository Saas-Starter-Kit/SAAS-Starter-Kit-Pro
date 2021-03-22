//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);
import db from '../../Database/sql/db.js';

const createOrg = async (org_name) => {
  let text = `INSERT INTO organizations(org_name)
              VALUES ($1)
              RETURNING id`;
  let values = [org_name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

const createUser = async (email, username, firebaseId) => {
  let text = `INSERT INTO users (username, email, firebase_user_id)
              VALUES($1, $2, $3)
              RETURNING id`;

  let values = [username, email, firebaseId];

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

describe('POST create org /api/org', () => {
  it('Should create org', async () => {
    let res = await request.post('/api/org').send({
      name: 'app-test-node'
    });
    expect(res.status).toEqual(200);
  });
});

describe('GET Org info /api/org', () => {
  it('get org with user id', async () => {
    let user = await createUser('example2@ex.com', 'username2', 'firebaseId2');

    let res = await request.get(`/api/org?user_id=${user.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('DELETE Org  /api/org', () => {
  it('delete org with org id', async () => {
    let org = await createOrg('org232');

    let res = await request.delete(`/api/org?org_id=${org.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('Put Org  /api/org', () => {
  it('update org name with org id', async () => {
    let org = await createOrg('org232');

    let res = await request.put(`/api/org`).send({ org_id: org.id, org_name: 'org3454355' });
    expect(res.status).toEqual(200);
  });
});
