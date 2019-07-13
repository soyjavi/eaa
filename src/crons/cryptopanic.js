import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import Storage from 'vanilla-storage';
import Telegram from 'telegraf/telegram';

import { C } from '../common';

const { ENV: { BOT_ARTICLES, CHAT_ADMIN, CRYPTOPANIC }, TELEGRAM_PROPS, STORE } = C;
const BOT = '[🤖:cryptopanic]';
const SERVICE = 'https://cryptopanic.com/api/v1/posts/';

const fetchData = async (uri, page) => {
  console.log(`${BOT} Fetching ${uri.replace('https://cryptopanic.com/', '')}...`);

  await page.goto(uri, { timeout: 10000, waitUntil: ['load', 'networkidle0'] }).catch(() => {});

  const summary = await page.$eval('#detail_pane .description-body > p', el => el.innerText).catch(() => {});
  const urlSource = await page.$eval('#detail_pane .post-title a:nth-child(2)', el => el.href);

  return { summary, urlSource, image: undefined };
};

const sendMessage = ({
  title, urlSource, votes: { positive, negative } = {},
}, telegram) => {
  telegram.sendMessage(
    CHAT_ADMIN,
    `${BOT} 👍 ${positive}  👎 ${negative}\n[${title}](${urlSource})`,
    TELEGRAM_PROPS,
  );
};

export default async () => {
  console.log(`${BOT} Searching new articles...`);

  const timestamp = (new Date()).getTime();
  const store = new Storage(STORE.CRONS);
  const telegram = new Telegram(BOT_ARTICLES);
  const response = await fetch(`${SERVICE}?auth_token=${CRYPTOPANIC}&filter=rising&kind=news`);
  let newArticles = 0;

  store.get('articles');

  if (response) {
    const { results } = await response.json();

    const articles = results.map(({
      id,
      title,
      votes: {
        negative, positive, liked, disliked,
      } = {},
      source: { region } = {},
      published_at: publishedAt,
      url,
      currencies = [],
    }) => ({
      id,
      title,
      region,
      url,
      currencies: currencies.map(currency => currency.code),
      tags: ['crypto'],
      votes: {
        negative, positive, liked, disliked,
      },
      publishedAt,
    }));

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPhone 6']);

    for (let article of articles) { // eslint-disable-line
      const query = { id: article.id };
      const found = store.find(query);

      if (found) store.update(query, article);
      else {
        const props = await fetchData(article.url, page);
        store.push({ ...article, ...props });
        sendMessage({ ...article, ...props }, telegram);
        newArticles += 1;
      }
    }

    await browser.close();

    console.log(`${BOT} Finished (${newArticles} fetched) - ${new Date().getTime() - timestamp} ms`);
  }
};
