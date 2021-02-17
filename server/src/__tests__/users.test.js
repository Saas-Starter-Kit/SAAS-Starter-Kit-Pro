//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';
const request = supertest(server);

// get/app-users
describe('GET app users info /get/app-users', () => {
  it('get app users info with app id', async () => {
    //create app

    let res = await request.get('/api/get/app-users?app_id=6025e9b0bcfcf3098888eadc');
    expect(res.status).toEqual(200);
  });
});
