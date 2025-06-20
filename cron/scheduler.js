const cron = require('node-cron');
const { Job } = require('../src/models');
const jobQueue = require('../queues/queue');

const scheduledTasks = {};

function scheduleJob(job) {
  if (scheduledTasks[job.id]) {
    scheduledTasks[job.id].stop();
  }
  const task = cron.schedule(job.schedule, () => {
    jobQueue.add('runJob', { jobId: job.id });
  }, { scheduled: true });

  scheduledTasks[job.id] = task;
  console.log(`Scheduled job ${job.id} with cron pattern '${job.schedule}'`);
}

async function scheduleJobsFromDB() {
  const jobs = await Job.findAll();
  jobs.forEach(scheduleJob);
}

module.exports = { scheduleJobsFromDB, scheduleJob };
