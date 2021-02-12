//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

describe('GET Role info /get/role', () => {
    it('get role info', async () => {
        request
            .get('/api/get/role?app_id=6025e9b0bcfcf3098888eadc&user_id=6025eb1c7542d71b215cec35')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('POST API Role /post/role', () => {
    it('create new role', async () => {
        request
            .post('/api/post/role')
            .send({
                app_id: '6025e9b0bcfcf3098888eadc',
                user_id: '6025eb1c7542d71b215cec35',
                role: 'adminUser'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('DELETE Role  /delete/role', () => {
    it('delete role with role id', async () => {
        request
            .delete('/api/delete/role?role_id=60265f20baf3385cefc59b66')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})
