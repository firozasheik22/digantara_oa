module.exports = {
  DB: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379'
};