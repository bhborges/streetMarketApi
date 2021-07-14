import chai from 'chai';
import request from 'supertest';
import Chance from 'chance';

import Server from '../index';

const chance = new Chance();
const expect = chai.expect;
let testFair = {
  long: chance.string(),
  lat: chance.string(),
  setcens: chance.string(),
  areap: chance.string(),
  coddist: chance.string(),
  distrito: chance.string(),
  codsubpref: chance.string(),
  subprefe: chance.string(),
  regiao5: chance.string(),
  regiao8: chance.string(),
  nomeFeira: chance.string(),
  registro: chance.string(),
  logradouro: chance.string(),
  numero: chance.string(),
  bairro: chance.string(),
  active: true,
};

describe('Fairs ', () => {
  /*create*/
  it('should add fair', async () => {
    for (let index = 0; index < 3; index++) {
      await request(Server)
        .post('/api/v1/fairs')
        .send(testFair)
        .then((r) => {
          testFair.id = r.body.id;
          expect(201);
          expect(r.body).to.not.equal('');
        });
    }
  });

  /*list*/
  it('should get all fairs', async () => {
    await request(Server)
      .get('/api/v1/fairs')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(200);
        expect(r.body.items)
          .to.be.an('array')
          .of.length.gte(3);
      });
  });

  /*get_by_id*/
  it('should get an fair by id', async () => {
    await request(Server)
      .get(`/api/v1/fairs/${testFair.id}`)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(200);
        expect(r.body.nomeFeira).to.be.a('string');
        expect(r.body).to.be.a('object');
      });
  });

  /*update*/
  it('should update a fair', async () => {
    testFair.nomeFeira = chance.string({ length: 5 });
    await request(Server)
      .put(`/api/v1/fairs/${testFair.id}`)
      .send(testFair)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(201);
        expect(r.body.nomeFeira).equal(testFair.nomeFeira);
      });
  });

  /*destroy*/
  it('should delete a fair', async () => {
    await request(Server)
      .delete(`/api/v1/fairs/${testFair.id}`)
      .expect(200);
  });
});
