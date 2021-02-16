//Require the dev-dependencies
import supertest from 'supertest';
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
