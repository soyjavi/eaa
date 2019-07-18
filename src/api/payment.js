import Storage from 'vanilla-storage';

import { C } from '../common';

const { STORE } = C;
const CANCELLED = 'cancelled';
const PAID = 'paid';
const PENDING = 'pending';

export default ({ props }, res) => {
  const { f, ts } = props;
  const orders = new Storage(STORE.PAYMENTS);
  const query = { id: ts, fingerprint: f };
  let response;
  orders.get('orders');

  const order = orders.findOne(query);

  if (!order) response = 'ok*';
  else if (order.state === CANCELLED || order.state === PAID) response = 'ok*';
  else {
    const { transaction_hash: hash, confirmations, value: amount } = props;
    const now = (new Date()).getTime();
    let state = PENDING;

    if (confirmations >= 3) state = PAID;
    else if (parseInt((now - order.id) / 1000, 10) > 3600) state = CANCELLED;

    orders.update({ ...query, state: PENDING }, {
      ...order,
      state,
      blockchain: {
        ...order.blockchain, hash, confirmations, amount, paidAt: new Date(),
      },
    });
  }

  return res.send(response);
};
