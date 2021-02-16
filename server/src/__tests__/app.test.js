//Require the dev-dependencies
import supertest from 'supertest';
import expect from 'expect';
import server from '../app.js';
const request = supertest(server);

describe('POST create App /post/app', () => {
  it('Should create app', async () => {
    let res = await request.post('/api/post/app').send({
      name: 'app-test-node'
    });
    expect(res.status).toEqual(200);
  });
});

describe('GET App info /get/app', () => {
  it('get app with user id', async (done) => {
    let res = await request.get('/api/get/app?user_id=60265f20baf3385cefc59b66');
    expect(res.status).toEqual(200);
    done();
  });
});

describe('DELETE App  /delete/app', () => {
  it('delete app with app id', async () => {
    let res = await request.delete('/api/delete/app?app_id=60265f20baf3385cefc59b66');
    expect(res.status).toEqual(200);
  });
});
