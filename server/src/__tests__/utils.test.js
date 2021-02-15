//Require the dev-dependencies
import supertest from 'supertest';
import server from '../../app.js';
import expect from 'expect';
const request = supertest(server)

describe('GET health check API /fail-health', () => {
    it('Failed Health Check', async () => {
        let res = await request
            .get('/fail-health')
        expect(res.status).toEqual(500)
    });
})
