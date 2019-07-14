import theme, { LIGHT, DARK } from './theme';

import { C } from '../common';
import fingerprint from './fingerprint';
import storage from './storage';

import traderBot from './on/onTraderbotMessage';

const { API } = C;
const IS_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line


const queryString = (props = {}) => (
  Object.keys(props)
    .filter(key => props[key] !== undefined && props[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
    .join('&') // eslint-disable-line
);

export default {
  toggleTheme() {
    theme.render(theme.current === LIGHT ? DARK : LIGHT);
  },

  dialogShow(id) {
    const el = document.querySelector(`.dialog.${id}`);
    if (el) el.classList.add('visible');
  },

  dialogHide() {
    const el = document.querySelector('.dialog.visible');
    if (el) el.classList.remove('visible');
  },

  async subscribe(el) {
    const [{ value: email }] = el.parentNode.children;

    if (!IS_EMAIL.test(email)) return;

    const response = await fetch('/api/subscribe', {
      headers: {
        ...API.HEADERS,
      },
      method: 'POST',
      body: queryString({ email, fingerprint }),
    }).catch(e => console.error(e));

    if (response) {
      storage.set('subscribe', true);
      this.modeSubscribed(true);
      document.cookie = `authorization=${fingerprint}; expires=-1; path=/`;
    }
  },

  traderBot,

  modeSubscribed(subscribed) {
    document.querySelectorAll('.banner').forEach((el) => {
      let method;
      if (el.classList.contains('subscribe')) method = subscribed ? 'add' : 'remove'
      else method = subscribed ? 'remove' : 'add';

      el.classList[method]('hide');
    });
  },

  // dashboard({ coin, period = '1D' }) {
  //   dashboard.fetchTimeline();
  //   dashboard.fetchTrend({ coin, period });
  // },
};
