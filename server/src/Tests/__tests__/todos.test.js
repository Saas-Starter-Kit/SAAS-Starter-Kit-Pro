//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);
import db from '../../Database/sql/db.js';

const createApp = async (name) => {
  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

const createUser = async (email, username) => {
  let text = `INSERT INTO users (username, email)
              VALUES($1, $2)
              RETURNING id`;
  let values = [username, email];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const createTodo = async (title, description, author, app_id) => {
  let text = `INSERT INTO todos(title, description, author, app_id)
              VALUES ($1, $2, $3, $4)
              RETURNING todo_id`;
  let values = [title, description, author, app_id];

  await db.query(text, values);

  return;
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

describe('GET Todo info /get/todos', () => {
  it('get todo info with app id', async () => {
    let app = await createApp('app1');

    let res = await request.get(`/api/get/todos?app_id=${app.app_id}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST API Todo /post/todo', () => {
  it('create new todo', async () => {
    let app = await createApp('app2');
    await createUser('email2@example.com', 'user2');

    let res = await request.post('/api/post/todo').send({
      title: 'example',
      description: 'working',
      author: 'user2',
      app_id: app.app_id
    });
    expect(res.status).toEqual(200);
  });
});

describe('PUT API Todo /put/todo', () => {
  it('update todo info', async () => {
    let res = await request.put('/api/put/todo').send({
      title: 'title edit',
      description: 'desc',
      author: 'user444',
      todo_id: 12
    });
    expect(res.status).toEqual(200);
  });
});

describe('DELETE Todo  /delete/todo', () => {
  it('delete todo with todo id', async () => {
    let res = await request.delete('/api/delete/todo').send({
      todo_id: 5
    });
    expect(res.status).toEqual(200);
  });
});
