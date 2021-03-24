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

const createUser = async (email, username) => {
  let text = `INSERT INTO users (username, email)
              VALUES($1, $2)
              RETURNING id`;
  let values = [username, email];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const createTodo = async (title, description, author, org_id) => {
  let text = `INSERT INTO todos(title, description, author, org_id)
              VALUES ($1, $2, $3, $4)
              RETURNING id`;
  let values = [title, description, author, org_id];

  await db.query(text, values);

  return;
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

describe('GET Todo info /get/todos', () => {
  it('get todo info with org id', async () => {
    let org = await createOrg('org3431');

    let res = await request.get(`/api/get/todos?org_id=${org.id}`);
    expect(res.status).toEqual(200);
  });
});

describe('POST API Todo /post/todo', () => {
  it('create new todo', async () => {
    let org = await createOrg('org345354');
    await createUser('email2@example.com', 'user2');

    let res = await request.post('/api/post/todo').send({
      title: 'example',
      description: 'working',
      author: 'user2',
      org_id: org.id
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
