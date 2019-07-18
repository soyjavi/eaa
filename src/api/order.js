import fetch from 'node-fetch';
import Storage from 'vanilla-storage';

import { C } from '../common';

const { ENV: { WALLET_KEY, WALLET_XPUB }, STORE } = C;

const URL = 'https://api.blockchain.info/v2';

export default async ({ props: { email, fingerprint, product } }, res) => {
  const now = new Date();
  const satoshis = 102392;

  // -- Find/Create subscriber
  const subscribers = new Storage(STORE.USERS);
  subscribers.get('subscribers');
  let subscriber = subscribers.findOne({ email });
  if (!subscriber) subscriber = subscribers.push({ email, fingerprint, createdAt: now });

  // -- Check gap
  // const urlGap = `${URL}/receive/checkgap?xpub=${WALLET_XPUB}&key=${WALLET_KEY}`;

  // -- Get a new public address
  const ts = now.getTime();
  const callback = encodeURIComponent(`http://activistafinanciero.com/api/payment?f=${fingerprint}&ts=${ts}`);
  const url = `${URL}/receive?xpub=${WALLET_XPUB}&callback=${callback}&key=${WALLET_KEY}`;
  const response = await fetch(url);
  const { address, index } = response;
  let order;

  // -- Save order
  if (address && index) {
    const orders = new Storage(STORE.PAYMENTS);
    orders.get('orders');
    order = orders.push({
      fingerprint,
      id: ts,
      product,
      email,
      amount: satoshis,
      blockchain: {
        address, index, hash: undefined, confirmations: undefined, amount: undefined,
      },
      state: 'pending',
      createdAt: now,
    });
  }

  // -- Response
  res.json(order);
};
