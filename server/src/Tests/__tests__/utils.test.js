import supertest from 'supertest';
import server from '../../app.js';
const request = supertest(server);

describe('GET health check API /health', () => {
  it('Passed Health Check', async () => {
    let res = await request.get('/health');
    expect(res.status).toEqual(200);
  });
});

describe('GET health check API /fail-health', () => {
  it('Failed Health Check', async () => {
    let res = await request.get('/fail-health');
    expect(res.status).toEqual(500);
  });
});
