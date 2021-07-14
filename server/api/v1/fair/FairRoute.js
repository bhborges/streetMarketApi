import * as express from 'express';

import FairController from './FairController';

export default express
  .Router()
  .get('/', FairController.get)
  .post('/', FairController.post)
  .get('/:id', FairController.getById)
  .put('/:id', FairController.put)
  .delete('/:id', FairController.delete);
