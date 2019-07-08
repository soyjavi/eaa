import { CronJob } from 'cron';

import cryptopanic from './cryptopanic';

const start = async () => {
  const crons = {};

  console.log('starting crons...');

  // -- CriptoPanic.com
  crons.cryptopanic = new CronJob({
    cronTime: '* 0 * * * *',
    onTick: cryptopanic,
    runOnInit: true,
    start: true,
  });
  // crons.cryptopanic.start();

  // -- ?

  return crons;
};

export default start();
