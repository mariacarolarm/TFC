import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import { invalidEmailLoginBody, invalidPasswordLoginBody, validLoginBody } from './mocks/User.mocks';
import User from '../database/models/UsersModel';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();

describe('Login Test', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('shouldn\'t login with an invalid body data', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('shouldn\'t login with an invalid email', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('shouldn\'t login with an invalid password', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidPasswordLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('shouldn\'t login when user is not found', async function() {
    sinon.stub(User, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);
    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});
