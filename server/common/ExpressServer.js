import * as path from 'path';
import * as http from 'http';
import * as os from 'os';

import * as bodyParser from 'body-parser';
import Express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errorHandler from '../api/middlewares/ErrorHandler';

import l from './Logger';

const app = new Express();
const corsOption = {
  allowedHeaders: [
    'OIDC-ID-TOKEN',
    'Authorization',
    'Accept',
    'Content-type',
    'userid',
    'Akana-Cookie',
    'languagecode',
    'countrycode',
    'X-Atlassian-Token',
    'X-CF-APP-INSTANCE',
    'user-id',
    'x-correlation-id',
    'pragma',
    'cache-control',
    'audit-details',
    'access-control-allow-methods',
    'access-control-allow-origin',
    'access-control-allow-credentials',
    'x-requested-with',
    'access-control-allow-headers',
  ],
};
export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cors(corsOption));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () => {
      l.info('server running', {
        env: process.env.NODE_ENV,
        host: os.hostname(),
        port: p,
      });
    };
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
