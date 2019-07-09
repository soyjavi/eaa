import dotenv from 'dotenv';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import Storage from 'vanilla-storage';
import Telegram from 'telegraf/telegram';


dotenv.config();
const { BOT_ARTICLES, CHAT_ADMIN, CRYPTOPANIC } = process.env;

const BOT = '[🤖:cryptopanic]';
const SERVICE = 'https://cryptopanic.com/api/v1/posts/';

const fetchData = async (uri, page) => {
  console.log(`${BOT} Fetching ${uri.replace('https://cryptopanic.com/', '')}...`);

  await page.goto(uri, { timeout: 10000, waitUntil: ['load', 'networkidle0'] }).catch(() => {});

  const description = await page.$eval('#detail_pane .description-body > p', el => el.innerText).catch(() => {});
  const urlSource = await page.$eval('#detail_pane .post-title a:nth-child(2)', el => el.href);

  return { description, urlSource, image: undefined };
};

const sendMessage = ({
  title, urlSource, description, votes: { positive, negative } = {},
}, telegram) => {
  telegram.sendMessage(
    CHAT_ADMIN,
    `${BOT}\n[${title}](${urlSource})\n_${description}_}\n👍 ${positive}  👎 ${negative}`,
    {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    },
  );
};

export default async () => {
  console.log(`${BOT} Searching new articles...`);

  const timestamp = (new Date()).getTime();
  const store = new Storage({ filename: 'crons', defaults: { articles: [] } });
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
      votes: {
        negative, positive, liked, disliked,
      },
      publishedAt,
      currencies: currencies.map(currency => currency.code),
    }));

    const browser = await puppeteer.launch();
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
