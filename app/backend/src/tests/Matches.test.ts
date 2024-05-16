import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/MatchesModel';
import { matches } from './mocks/Match.mocks';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return all matches', async function() {
    sinon.stub(Matches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
});
