//Require the dev-dependencies
import supertest from 'supertest';
import server from '../app.js';
import expect from 'expect';
const request = supertest(server);

it('returns the expected value', () => {
  console.log();
  expect(1).toEqual(1);
});
