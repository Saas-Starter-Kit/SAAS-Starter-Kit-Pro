//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';

const request = supertest(server);

// get/app-users
describe('GET app users info /get/app-users', () => {
  it('get app users info with app id', async () => {
    let res = await request.get('/api/get/app-users?app_id=6025e9b0bcfcf3098888eadc');
    expect(res.status).toEqual(200);
  });
});

describe('POST contact API /post/contact', () => {
  it('create new contact', async () => {
    let res = await request.post('/api/post/contact').send({
      firstName: 'guri',
      email: 'k1424sap@gmail.com'
    });
    expect(res.status).toEqual(200);
  });
});

describe('POST invite new user API /users/invite', () => {
  it('invite new user', async () => {
    let res = await request.post('/api/users/invite').send({
      inviterEmail: 'k1424sap@gmail.com',
      inviterDisplayName: 'GuriSingh',
      inviteRecipient: 'YesinviteRecipient',
      domainUrl: 'domain.com',
      app_id: '6025e9b0bcfcf3098888eadc'
    });
    expect(res.status).toEqual(200);
  });
});
