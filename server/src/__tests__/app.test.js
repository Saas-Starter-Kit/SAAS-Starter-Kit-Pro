//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';
const request = supertest(server);
import db from '../Database/sql/db.js';

const createApp = async (name) => {
  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

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

describe('POST create App /post/app', () => {
  it('Should create app', async () => {
    createUser('example1@example.com', 'username1', 'firebaseID1');

    let res = await request.post('/api/post/app').send({
      name: 'app-test-node'
    });
    expect(res.status).toEqual(200);
  });
});

describe('GET App info /get/app', () => {
  it('get app with user id', async () => {
    let user = await createUser('example2@ex.com', 'username2', 'firebaseId2');

    let res = await request.get(`/api/get/app?user_id=${user.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('DELETE App  /delete/app', () => {
  it('delete app with app id', async () => {
    let app = await createApp();

    console.log(app);
    let res = await request.delete(`/api/delete/app?app_id=${app.app_id}`);
    expect(res.status).toEqual(200);
  });
});
