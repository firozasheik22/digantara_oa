const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING,
    schedule: DataTypes.STRING,
    lastRunAt: DataTypes.DATE,
    nextRunAt: DataTypes.DATE,
    payload: DataTypes.JSON,
  });
  return Job;
};