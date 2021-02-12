//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

// get/app-users
describe('GET app users info /get/app-users', () => {
    it('get app users info with app id', async () => {
        request
            .get('/api/get/app-users?app_id=6025e9b0bcfcf3098888eadc')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('POST contact API /post/contact', () => {
    it('create new contact', async () => {
        request
            .post('/api/post/contact')
            .send({
                firstName: "guri",
                "email": 'k1424sap@gmail.com'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('POST invite new user API /users/invite', () => {
    it('invite new user', async () => {
        request
            .post('/api/users/invite')
            .send({
                inviterEmail: 'k1424sap@gmail.com',
                inviterDisplayName: "GuriSingh",
                inviteRecipient: "YesinviteRecipient",
                domainUrl: 'domain.com',
                app_id: '6025e9b0bcfcf3098888eadc'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})


