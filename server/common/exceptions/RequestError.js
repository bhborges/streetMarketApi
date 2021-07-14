import ApplicationError from './ApplicationError.js';

export default class RequestError extends ApplicationError {
  constructor(message, status = 400, errorCode = null) {
    super(
      message ||
        'Ocorreu um erro ao processar sua requisição, tente novamente ou contate nosso suporte',
      status,
      errorCode,
      null,
      'warn'
    );
  }
}
