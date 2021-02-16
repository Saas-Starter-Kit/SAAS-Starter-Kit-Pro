//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';

const request = supertest(server);

describe('GET Role info /get/role', () => {
  it('get role info', async () => {
    let res = await request.get(
      '/api/get/role?app_id=6025e9b0bcfcf3098888eadc&user_id=6025eb1c7542d71b215cec35'
    );
    expect(res.status).toEqual(200);
  });
});

describe('POST API Role /post/role', () => {
  it('create new role', async () => {
    let res = await request.post('/api/post/role').send({
      app_id: '6025e9b0bcfcf3098888eadc',
      user_id: '6025eb1c7542d71b215cec35',
      role: 'adminUser'
    });
    expect(res.status).toEqual(200);
  });
});

describe('DELETE Role  /delete/role', () => {
  it('delete role with role id', async () => {
    let res = await request.delete('/api/delete/role?role_id=60265f20baf3385cefc59b66');

    expect(res.status).toEqual(200);
  });
});
