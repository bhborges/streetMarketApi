import * as Sequelize from 'sequelize';
import * as messages from 'i18n';

import ValidationError from '../common/exceptions/ValidationError';
import NotFoundError from '../common/exceptions/NotFoundError';

import projection from './Projection';
import findAllAndCount from './FindAllAndCount';

const Op = Sequelize.Op;

export default class CommonService {
  constructor(model, searchFields = [], order = [['id', 'DESC']]) {
    this.model = model;
    this.searchFields = searchFields;
    this.order = order;
  }

  async allWithSearch(params, ignoreActive = false) {
    const conditions = [];
    const { search, select, page, ignorePagination, active = true } = params;
    const queryOptions = {
      attributes: projection(select),
      where: {},
      order: this.order,
      include: [],
    };
    if (ignoreActive) {
      conditions.push({ active: active });
    }
    if (search != null && search !== '') {
      for (let searchField of this.searchFields) {
        conditions.push({ [searchField]: { [Op.iLike]: `%${search}%` } });
      }
    }
    if (conditions.length > 0) {
      queryOptions.where[Op.or] = conditions;
    }
    return await findAllAndCount(
      this.model,
      queryOptions,
      page,
      ignorePagination
    );
  }

  async create(data) {
    return this.model.create(data);
  }

  async byId(id) {
    if (!id) {
      throw new ValidationError(
        messages.__('validation.field.isRequired'),
        'id'
      );
    }
    return this.model.findOne({ where: { id: id } });
  }

  async updateById(id, data) {
    delete data.id;

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

    return await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  async deleteById(id, req) {
    try {
      const actionQuery = await this.model.findAll({ where: { registro: id } });
      await this.model.update(
        { active: false },
        {
          where: { id },
          bulkQuery: actionQuery,
          req: req,
          newData: { active: false },
          isDelete: true,
        }
      );
    } catch (error) {
      if (error.name == 'SequelizeForeignKeyConstraintError') {
        throw new ValidationError(
          req.t('validation.field.delete', { field: '*' })
        );
      }
      throw error;
    }
  }
}
