import dotenv from 'dotenv';

dotenv.config();
const {
  ALPHAVANTAGE, BOT, BOT_ARTICLES, CHANNEL_TRADERBOT, CHAT_ADMIN, CRYPTOPANIC,
} = process.env;

export default {
  ENV: {
    ALPHAVANTAGE,
    BOT,
    BOT_ARTICLES,
    CHAT_ADMIN,
    CHANNEL_TRADERBOT,
    CRYPTOPANIC,
  },

  // -- SITE
  DOMAIN: 'activistafinanciero.com',
  EMAIL: 'tyler.durden.unnamed@gmail.com',
  TITLE: 'activista financiero',
  DESCRIPTION: 'En una línea de tiempo suficientemente larga, la tasa de supervivencia para todos baja a cero.',
  FAVICON: '/favicon-app.png',

  // -- API
  API: {
    HEADERS: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },

  // -- STORE
  STORE: {
    CRONS: {
      filename: 'crons',
      defaults: { articles: [] },
    },
    POSTS: {
      filename: 'posts',
      defaults: { public: [], private: [] },
    },
    SUBSCRIBERS: {
      filename: 'subscribers',
      defaults: {
        public: [], monthly: [], bot: [], course: [],
      },
    },
    USERS: {
      filename: 'users',
      defaults: { admins: [] },
    },
    LOGS: {
      filename: 'logs',
      defaults: { traderbot: [] },
    },
  },

  TELEGRAM_PROPS: { parse_mode: 'Markdown', disable_web_page_preview: true },

  UNSPLASH_PROPS: '?ixlib=rb-1.2.1&auto=format&fit=crop&q=80',
};
