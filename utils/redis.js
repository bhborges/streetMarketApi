const Redis = require('redis');
import RequestError from '../server/common/exceptions/RequestError';
import l from '../server/common/Logger';
import { promisify } from 'util';

const { redis: redisConfig } = require('../config/environment');

const redisInstance = Redis.createClient({
  host: redisConfig.url,
  port: redisConfig.port,
});

async function get(key) {
  try {
    const getAsync = promisify(redisInstance.get).bind(redisInstance);
    return await getAsync(key);
  } catch (e) {
    l.error('Redis Error: ', e);
    throw new RequestError(null, 400, 22341);
  }
}

async function set(key, data, seconds = 86400) {
  try {
    const setAsync = promisify(redisInstance.set).bind(redisInstance);
    return await setAsync(key, data, 'EX', seconds);
  } catch (e) {
    l.error('Redis Error: ', e);
    throw new RequestError(null, 400, 22341);
  }
}

async function del(key) {
  try {
    const delAsync = promisify(redisInstance.del).bind(redisInstance);
    return await delAsync(key);
  } catch (e) {
    l.error('Redis Error: ', e);
    return null;
  }
}

module.exports = { get, set, del };
