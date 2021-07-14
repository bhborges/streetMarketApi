import pino from 'pino';

import config from '../../config/environment';

const Logger = pino({
  name: config.App.id,
  level: config.logLevel,
});

export default Logger;
