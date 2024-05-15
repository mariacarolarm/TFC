import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/TeamsModel';
import { teams, team } from './mocks/Team.mocks';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return all teams', async function() {
    sinon.stub(Teams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a team by id', async function() {
    sinon.stub(Teams, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
});
