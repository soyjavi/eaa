import Storage from 'vanilla-storage';
import Telegram from 'telegraf/telegram';

import { C } from '../common';

const { ENV: { BOT, CHANNEL_TRADERBOT }, STORE, TELEGRAM_PROPS } = C;
const CODE = '`';

export default ({ props, session }, res) => {
  const logs = new Storage(STORE.LOGS);
  let { message } = props;
  let symbol;

  logs.get('traderbot');

  if (message.toLowerCase().includes('sell')) symbol = '🔴🔻';
  if (message.toLowerCase().includes('buy')) symbol = '📗';
  if (message.toLowerCase().includes('aviso')) symbol = '⚠️';
  if (symbol) message = `${symbol} ${message}`;

  const log = logs.push({
    channel: 'traderbot', message, adminId: session.id, createdAt: new Date(),
  });

  const telegram = new Telegram(BOT);
  telegram.sendMessage(
    CHANNEL_TRADERBOT,
    `${CODE}${message}${CODE}`,
    TELEGRAM_PROPS,
  );

  return res.json(log);
};
