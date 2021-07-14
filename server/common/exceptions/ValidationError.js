import ApplicationError from './ApplicationError';

export default class ValidationError extends ApplicationError {
  // eslint-disable-next-line no-unused-vars
  constructor(message, attribute = '*', errorCode = null) {
    let newMessage = message;

    if (typeof message === 'object') {
      if (message.errors) {
        newMessage = message.errors.map((err) => ({
          attribute: err.path,
          message: err.message,
        }));
      }
    }

    super(newMessage || 'Entidade não processável', 422, errorCode);
  }
}
