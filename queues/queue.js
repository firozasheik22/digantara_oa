const { Queue } = require('bullmq');
const config = require('../config');
const connection = { url: config.REDIS_URL }; // Redis clustering supported

const jobQueue = new Queue('jobs', { connection });

module.exports = jobQueue;