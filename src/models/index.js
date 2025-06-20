const { Sequelize } = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize(config.DB);

const db = {};
db.sequelize = sequelize;
db.Job = require('./job.model')(sequelize);

module.exports = db;