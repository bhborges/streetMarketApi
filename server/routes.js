import * as express from 'express';

import healthCheck from './common/Health-check';
import FairRoute from './api/v1/fair/FairRoute';
import ImportRoute from './api/v1/import/ImportRoute';

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('docs/swagger.yaml');

export default function routes(app) {
  app.use(
    '/api',
    express
      .Router()
      .use('/v1/fairs', FairRoute)
      .use('/v1/imports', ImportRoute)
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.get('/health-check', healthCheck);
}
