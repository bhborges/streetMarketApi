import * as messages from 'i18n';

import CommomService from '../../../common/CommonService';
import models from '../../../models';
import ValidationError from '../../../common/exceptions/ValidationError';
import NotFoundError from '../../../common/exceptions/NotFoundError';

const { Fair } = models;
const searchFields = ['distrito', 'regiao5', 'nomeFeira', 'bairro'];

const order = [
  ['nomeFeira', 'ASC'],
  ['id', 'ASC'],
];

class FairService extends CommomService {
  constructor(req) {
    super(Fair, searchFields, order);
    this.req = req;
  }

  // overwrite method
  async updateById(id, data) {
    delete data.id;
    delete data.registro;

    if (!id) {
      throw new ValidationError(
        messages.__('validation.field.isRequired'),
        'id'
      );
    }

    const foundRegistry = await this.byId(id);

    if (!foundRegistry) {
      throw new NotFoundError();
    }

    return this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
  }
}
export default new FairService();
