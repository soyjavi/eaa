import Storage from 'vanilla-storage';
import Telegram from 'telegraf/telegram';

import { C } from '../common';

const { ENV: { BOT_ARTICLES, CHANNEL_ADMIN }, STORE, TELEGRAM_PROPS } = C;

export default ({ props: { email, fingerprint } }, res) => {
  const subscribers = new Storage(STORE.USERS);
  subscribers.get('subscribers');

  if (subscribers.find({ email })) return res.json({ error: 'Este email ya esta registrado.' });

  const subscriber = subscribers.push({ email, fingerprint, createdAt: new Date() });
  const telegram = new Telegram(BOT_ARTICLES);
  telegram.sendMessage(
    CHANNEL_ADMIN,
    `Nuevo registro a *weekly*\n${email}\n${fingerprint || 'unknown fingerprint'}`,
    TELEGRAM_PROPS,
  );

  return res.json(subscriber);
};
