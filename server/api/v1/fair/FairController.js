import ResponseHandler from '../../../common/ResponseHandler';
import Logger from '../../../common/Logger';
import NotFoundError from '../../../common/exceptions/NotFoundError';

import FairService from './FairService';

export class FairController {
  async get(req, res) {
    try {
      Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
      const fairs = await FairService.allWithSearch(req.query);
      return res.json(fairs);
    } catch (e) {
      ResponseHandler.error(res, e);
    }
  }

  async getById(req, res) {
    try {
      const fair = await FairService.byId(req.params.id, req.query);

      if (!fair) {
        throw new NotFoundError(req);
      }

      return res.json(fair);
    } catch (e) {
      ResponseHandler.error(res, e);
    }
  }

  async post(req, res) {
    try {
      const data = await FairService.create(req.body);

      return res.status(201).json(data);
    } catch (e) {
      ResponseHandler.error(res, e);
    }
  }

  async put(req, res) {
    try {
      const { id } = req.params;

      Logger.debug(`Id updated -> ${id}`);

      const data = await FairService.updateById(id, req.body);

      return res.status(200).json(data[1]);
    } catch (e) {
      ResponseHandler.error(res, e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      Logger.debug(`Id Deleted -> ${id}`);

      const data = await FairService.deleteById(id);

      return res.status(200).json(data);
    } catch (e) {
      Logger.debug(`Error Deleted -> ${e}`);
      ResponseHandler.error(res, e);
    }
  }
}
export default new FairController();
