//Require the dev-dependencies
import chai from 'chai';
const expect = chai.expect;
import server from '../../app.js';
import supertest from 'supertest';
const request = supertest(server)

describe('GET Todo info /get/todos', () => {
    it('get todo info with app id', async () => {
        request
            .get('/api/get/todos?app_id=6025e9b0bcfcf3098888eadc')
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('POST API Todo /post/todo', () => {
    it('create new todo', async () => {
        request
            .post('/api/post/todo')
            .send({
                title: 'guribhai',
                description: 'working',
                author: 'mrguri',
                app_id: '6025e9b0bcfcf3098888eadc'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('PUT API Todo /put/todo', () => {
    it('update todo info', async () => {
        request
            .put('/api/put/todo')
            .send({
                title: 'guribhai',
                description: 'working',
                author: 'KLS01',
                todo_id: '602689c86dfb7c7ded72c200'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})

describe('DELETE Todo  /delete/todo', () => {
    it('delete todo with todo id', async () => {
        request
            .delete('/api/delete/todo')
            .send({
                todo_id: '602689c86dfb7c7ded72c200'
            })
            .end((err, res) => {
                expect(res.status).to.equal(200)
            })
    });
})
