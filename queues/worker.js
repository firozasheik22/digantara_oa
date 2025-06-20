const { Worker } = require('bullmq');
const config = require('../config');
const { Job } = require('../src/models');
const { sendDummyEmail } = require('../src/utils/email.util');

const connection = { url: config.REDIS_URL };

new Worker('jobs', async job => {
  const jobData = await Job.findByPk(job.data.jobId);
  if (!jobData) return;
  await sendDummyEmail(jobData.payload.email, `Job: ${jobData.name}`, 'Scheduled email job executed.');

  await jobData.update({ lastRunAt: new Date() });
}, { connection });
