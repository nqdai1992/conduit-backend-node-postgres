import resetDatabase from '@/infastructure/database/resetDatabase';
import { assert, expect } from 'chai';
import request from 'supertest';
import app from '../application';


describe('POST /api/user', () => {
  beforeEach(async function() {
    await resetDatabase()
  });

  afterEach(async function() {
    await resetDatabase()
  });

  it('register user', (done) => {    
    const newUser = {
      username: 'usertest',
      email: 'usertest@gmail.com',
      password: '123123',
    };

    request(app)
      .post('/api/users')
      .send({ user: newUser })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then((res) => {
        assert.equal(newUser.username, res.body.user.username);
        assert.equal(newUser.email, res.body.user.email);
        expect(res.body.user).to.have.a.property('token');
        done();
      })
      .catch((err) => done(err));
  });
});
