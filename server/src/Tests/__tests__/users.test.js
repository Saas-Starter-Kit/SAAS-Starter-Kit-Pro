//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);

// get/app-users
describe('GET app users info /get/app-users', () => {
  it('get app users info with app id', async () => {
    let app_id = 5;

    let res = await request.get(`/api/get/app-users?app_id=${app_id}`);
    expect(res.status).toEqual(200);
  });
});
