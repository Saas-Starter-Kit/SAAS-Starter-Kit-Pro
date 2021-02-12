//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

describe('PUT User Update API /put/username', () => {
    it('Update username', async () => {
        request
            .put('/auth/put/username')
            .send({
                id: '60262a576bbb5a4396dcce46', // userId
                curEmail: 'josan@gmail.com',
                username: 'Gurpreet'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('PUT User Update API /put/email', () => {
    it('Update user email', async () => {
        request
            .put('/auth/put/email')
            .send({
                id: '60262a576bbb5a4396dcce46', // userId
                oldEmail: 'josan@gmail.com',
                email: 'josan123@gmail.com'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

