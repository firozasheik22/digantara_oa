const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const jobRoutes = require('./src/routes/job.routes');
const { sequelize } = require('./src/models');
    const { scheduleJobsFromDB } = require('./cron/scheduler');
require('./queues/worker');

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

// Apply global rate limiting (6000 requests/minute distributed)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6000,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

app.use('/jobs', jobRoutes);

sequelize.sync().then(() => {
  scheduleJobsFromDB();
  app.listen(3000, () => console.log('Scheduler service running on port 3000'));
});