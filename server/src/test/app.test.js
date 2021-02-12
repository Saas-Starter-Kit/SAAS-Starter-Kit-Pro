//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

describe('POST create App /post/app', () => {
    it('Should create app', async () => {
        request
            .post('/api/post/app')
            .send({
                name: 'app-test-app'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    })
});

describe('GET App info /get/app', () => {
    it('get app with user id', async () => {
        request
            .get('/api/get/app')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})


describe('DELETE App  /delete/app', () => {
    it('delete app with app id', async () => {
        request
            .delete('/api/delete/app?app_id=60265f20baf3385cefc59b66')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})
