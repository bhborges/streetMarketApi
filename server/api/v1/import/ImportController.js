import ResponseHandler from '../../../common/ResponseHandler';
import Logger from '../../../common/Logger';

import ImportService from './ImportService';

export class ImportController {
  async locations(req, res) {
    try {
      Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
      Logger.debug(`Body -> ${JSON.stringify(req.body)}`);
      await ImportService.fairsXls(req.file);
      return res.status(200).json();
    } catch (e) {
      ResponseHandler.error(res, e);
    }
  }
}

export default new ImportController();
