import { CronJob } from 'cron';

import cryptopanic from './cryptopanic';

const DEFAULTS = { runOnInit: true, start: true, timeZone: 'America/Los_Angeles' };
const crons = {};

const start = async () => {

  // -- CriptoPanic.com
  crons.cryptopanic = new CronJob({ cronTime: '*/30 * * * *', onTick: cryptopanic, ...DEFAULTS });

  return crons;
};

const stop = () => {
  Object.keys(crons).forEach((cron) => {
    console.log(`[🤖:${cron}]`);
    crons[cron].stop();
  });
};

export default {
  start,

  stop,
};
