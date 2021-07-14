import request from 'supertest';

import Server from '../index';

describe('Imports ', () => {
  it('should import the file', async () => {
    await request(Server)
      .post('/api/v1/imports/fairs')
      .attach('file', 'docs/DEINFO_AB_FEIRASLIVRES_2014.xls')
      .expect(200);
  });

  it('should not import the file', async () => {
    await request(Server)
      .post('/api/v1/imports/fairs')
      .attach('file', '')
      .expect(500);
  });
});
