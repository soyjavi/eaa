import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram';
import Storage from 'vanilla-storage';

dotenv.config();
const { BOT_ARTICLES, CHAT_ARTICLES} = process.env;
const SERVICE = 'https://cryptopanic.com/api/v1/posts/';

const store = new Storage({ filename: 'crons', defaults: { articles: [] } });
store.get('articles');

export default async () => {
  console.log('[BOT] Fetching cryptopanic.com ...');

  const telegram = new Telegram(BOT_ARTICLES);
  // telegram.sendMessage(CHAT_ARTICLES, 'ssss');

  // const bot = new Telegraf(BOT_ARTICLES);
  // bot.use((ctx, next) => {
  //   const start = new Date()
  //   return next(ctx).then(() => {
  //     const ms = new Date() - start
  //     console.log(ctx);
  //     console.log('Response time %sms', ms)
  //   });
  // });
  // bot.start((ctx) => ctx.reply('Welcome'));
  // bot.on('text', (ctx) => ctx.reply('Hello World'));
  // bot.launch();

  const url = `${SERVICE}?auth_token=66ddd57a01718e57f61d27e37dc7e9c8dca01615&filter=rising&kind=news`;
  const response = await fetch(url);

  if (response) {
    const { results } = await response.json();

    // console.log('??', results);
    // const { results = [] } = await response.json();

    const articles = results.map(({
      id,
      votes: {
        negative, positive, liked, disliked,
      } = {},
      title,
      domain,
      source: { region } = {},
      published_at,
      url,
      currencies = [],
    }) => ({
      id,
      title,
      domain,
      region,
      votes: {
        negative, positive, liked, disliked,
      },
      published_at,
      url,
      currencies: currencies.map(currency => currency.code),
    }));

    articles.forEach((article) => {
      const query = { id: article.id };
      const found = store.find(query);
      if (found) {
        console.log(`ARTICLE:Updated ${article.title}`);
        store.update(query, article);
      } else {
        console.log(`ARTICLE:Created ${article.title}`);
        store.push(article);
        telegram.sendMessage(CHAT_ARTICLES, `${article.title} ${article.url}`);
      }
    });
  }
};
