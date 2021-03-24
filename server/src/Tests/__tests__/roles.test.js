import supertest from 'supertest';
import server from '../../app.js';
import db from '../../Database/sql/db.js';
const request = supertest(server);

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

describe('GET Role info /get/role', () => {
  it('get role info', async () => {
    let org = await createOrg('org34423');
    let user = await createUser('email1@example.com', 'username1', 'firebaseid1');

    let res = await request.get(`/api/get/role?org_id=${org.id}&user_id=${user.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST API Role /post/role', () => {
  it('create new role', async () => {
    let org = await createOrg('org323534');
    let user = await createUser('email2@example.com', 'username2', 'firebaseid2');

    let res = await request.post('/api/post/role').send({
      org_id: org.id,
      user_id: user.id,
      role: 'admin'
    });
    expect(res.status).toEqual(200);
  });
});

describe('DELETE Role  /delete/role', () => {
  it('delete role with role id', async () => {
    let role_id = 5;

    let res = await request.delete(`/api/delete/role?role_id=${role_id}`);

    expect(res.status).toEqual(200);
  });
});
