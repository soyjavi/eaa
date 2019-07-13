import dotenv from 'dotenv';

dotenv.config();
const {
  ALPHAVANTAGE, BOT_ARTICLES, CHAT_ADMIN, CRYPTOPANIC,
} = process.env;

export default {
  ENV: {
    ALPHAVANTAGE,
    BOT_ARTICLES,
    CHAT_ADMIN,
    CRYPTOPANIC,
  },

  // -- SITE
  DOMAIN: 'activistafinanciero.com',
  EMAIL: 'tyler.durden.unnamed@gmail.com',
  TITLE: 'activista financiero',
  DESCRIPTION: 'on a long enough timeline the survival rate for everyone drops to zero.',
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
  },

  TELEGRAM_PROPS: { parse_mode: 'Markdown', disable_web_page_preview: true },
};
