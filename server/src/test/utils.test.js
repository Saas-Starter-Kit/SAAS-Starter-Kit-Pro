//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

describe('GET health check API /fail-health', () => {
    it('Failed Health Check', async () => {
        request
            .get('/fail-health')
            .end((err, res) => {
                expect(res.status).to.equal(500)
            })
    });
})



