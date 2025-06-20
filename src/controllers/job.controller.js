const { Job } = require('../models');
const scheduler = require('../../cron/scheduler');

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.findAll();
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

exports.createJob = async (req, res) => {
  const { name, schedule, payload } = req.body;
  try {
    const job = await Job.create({ name, schedule, payload });
    scheduler.scheduleJob(job);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: 'Error creating job', error: err.message });
  }
};
