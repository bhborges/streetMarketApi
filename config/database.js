'use strict';
const { dbConfig, redis } = require('./environment');
if (process.env.NODE_ENV === 'development') {
  console.log(`Environment ${JSON.stringify(dbConfig)}`);
  console.log(`Redis ${JSON.stringify(redis)}`);
  console.log(`Database.username ${dbConfig.username}`);
}
module.exports = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  schema: dbConfig.schema,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: parseInt(dbConfig.pool.max),
    min: parseInt(dbConfig.pool.min),
    acquire: parseInt(dbConfig.pool.acquire),
    idle: parseInt(dbConfig.pool.idle),
    evict: parseInt(dbConfig.pool.evict),
  },
  define: {
    underscored: true,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
  },
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production',
    connectTimeout: 600000,
    useUTC: false,
    dateStrings: true,
    typeCast: function(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }

      return next();
    },
  },
  ssl: true,
  timezone: '-03:00',
  autoreconnect: true,
  logging: true,
};
