import supertest from 'supertest';
import server from '../../app.js';
import db from '../../Database/sql/db.js';
const request = supertest(server);

const createApp = async (name) => {
  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

const createRole = async (app_id, user_id, role) => {
  let text = `INSERT INTO roles(app_id, user_id, role)
              VALUES ($1, $2, $3)
              RETURNING role_id`;
  let values = [app_id, user_id, role];

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

afterEach(() => {
  clearAppDb();
});

describe('GET Role info /get/role', () => {
  it('get role info', async () => {
    let app = await createApp('app1');
    let user = await createUser('email1@example.com', 'username1', 'firebaseid1');

    let res = await request.get(`/api/get/role?app_id=${app.app_id}&user_id=${user.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST API Role /post/role', () => {
  it('create new role', async () => {
    let app = await createApp('app2');
    let user = await createUser('email2@example.com', 'username2', 'firebaseid2');

    let res = await request.post('/api/post/role').send({
      app_id: app.app_id,
      user_id: user.id,
      role: 'admin'
    });
    expect(res.status).toEqual(200);
  });
});

describe('DELETE Role  /delete/role', () => {
  it('delete role with role id', async () => {
    let app = await createApp('app3');
    let user = await createUser('email3@example.com', 'username3', 'firebaseid3');
    let role = await createRole(app.app_id, user.id, 'admin');

    let res = await request.delete(`/api/delete/role?role_id=${role.role_id}`);

    expect(res.status).toEqual(200);
  });
});
