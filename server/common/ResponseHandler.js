import * as messages from 'i18n';

import { errors } from '../../utils/errorsCode';

import Logger from './Logger';

export default class ResponseHandler {
  static error(response, error) {
    if (!error) {
      Logger.error(error, 'Unhandled Error');

      return response.status(500).json('Internal server error');
    }

    if (error.name == 'SequelizeDatabaseError') {
      Logger.error(error, error.message);
      return response.status(500).json('Internal server error');
    }

    if (error.name === 'RequestError') {
      let errorCode = error.code ? error.code : 12459;
      const errorHandler = errors.find(
        (errorResponse) => errorResponse.code === errorCode
      );
      const translatedMessage = messages.__(errorHandler.message);
      const translatedDescription = messages.__(errorHandler.description);
      errorHandler.message = translatedMessage;
      errorHandler.description = translatedDescription;
      Logger.error(errorHandler, errorHandler.description);
      return response.status(error.status).json(errorHandler);
    }

    if (error.name === 'ValidationError') {
      let errorCode = error.code ? error.code : 2090;
      const errorHandler = errors.find(
        (errorResponse) => errorResponse.code === errorCode
      );
      if (error.message != '' && error.message != null) {
        errorHandler.message = error.message;
        errorHandler.description = error.message;
      } else {
        const translatedMessage = messages.__(errorHandler.message);
        const translatedDescription = messages.__(errorHandler.description);
        errorHandler.message = translatedMessage;
        errorHandler.description = translatedDescription;
        errorHandler.errors = error.errors;
      }
      Logger.error(errorHandler, errorHandler.description);
      return response.status(error.status || 400).json(errorHandler);
    }

    Logger.error(error, error.message);
    return response
      .status(error.status || 500)
      .json(error.message || 'Internal server error');
  }
}
