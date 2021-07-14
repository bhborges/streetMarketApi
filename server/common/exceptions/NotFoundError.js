import ApplicationError from './ApplicationError.js';

export default class NotFoundError extends ApplicationError {
  constructor(request = null, message) {
    super(message || 'Registro não encontrado', 404, request, 'warn');
  }
}
