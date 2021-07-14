'use strict';
require('dotenv').config();

console.log('Environment: ' + process.env.NODE_ENV);

module.exports = {
  dbConfig: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    schema: process.env.DATABASE_SCHEMA,
    port: process.env.DATABASE_PORT || 5432,
    pool: {
      max: process.env.DATABASE_POOL_MAX || '30',
      min: process.env.DATABASE_POOL_MIN || '0',
      acquire: process.env.DATABASE_POOL_ACQUIRE || 60000,
      idle: process.env.DATABASE_POOL_IDLE || 10000,
      evict: process.env.DATABASE_POOL_EVICT || 1000,
    },
  },
  redis: {
    url: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  App: {
    id: process.env.APP_ID,
    port: process.env.APP_PORT || 80,
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  requestLimit: process.env.REQUEST_LIMIT || '10mb',
  sessionSecret: process.env.SESSION_SECRET || 'mySecret',
  staticFiles: process.env.STATIC_FILES || '/usr/app/public/files',
  openApiResponseValidation:
    process.env.DISABLE_REQUEST_AUTHORIZATION_HEADER === 'true' || false,
};
