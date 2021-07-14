import './common/env';
import config from '../config/environment';

import Server from './common/ExpressServer';
import routes from './routes';

export default new Server().router(routes).listen(config.App.port);
