//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';
import expect from 'expect';
const request = supertest(server);

describe('PUT User Update API /put/username', () => {
  it('Update username', async () => {
    let res = await request.put('/auth/put/username').send({
      id: '60262a576bbb5a4396dcce46',
      curEmail: 'josan@gmail.com',
      username: 'Gurpreet'
    });

    expect(res.status).toEqual(200);
  });
});

describe('PUT User Update API /put/email', () => {
  it('Update user email', async () => {
    let res = await request.put('/auth/put/email').send({
      id: '60262a576bbb5a4396dcce46',
      oldEmail: 'josan@gmail.com',
      email: 'josan123@gmail.com'
    });

    expect(res.status).toEqual(200);
  });
});
