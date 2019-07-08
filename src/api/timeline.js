import dotenv from 'dotenv';
import fetch from 'node-fetch';

import { cache } from '../modules';

dotenv.config();
const { ALPHAVANTAGE } = process.env;

const BASE = 'https://www.alphavantage.co/query';

export default async ({ props: { symbol = 'BTC', currency = 'USD' }}, res) => {
  const URL = `${BASE}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${currency}&apikey=${ALPHAVANTAGE}`;
  let timeline = [];

  const response = await fetch(URL);
  if (response) {
    const json = await response.json();
    const { 'Time Series (Digital Currency Daily)': dates = {} } = json;

    console.log('json', Object.keys(json));
    // console.log('dates', Object.keys(dates));

    // "1a. open (USD)": "10591.57686032",
    //             "1b. open (USD)": "10591.57686032",
    //             "2a. high (USD)": "10915.95191394",
    //             "2b. high (USD)": "10915.95191394",
    //             "3a. low (USD)": "9714.50708130",
    //             "3b. low (USD)": "9714.50708130",
    //             "4a. close (USD)": "10816.38588672",
    //             "4b. close (USD)": "10816.38588672",
    //             "5. volume": "138255.76152435",
    //             "6. market cap (USD)": "1495427667.71032572"

    Object.keys(dates)
      .slice(0, 365)
      .forEach((key) => {
        const [open, , high, , low, , close, , volume, marketcap] = Object.values(dates[key]);
        timeline.push([
          key,
          parseFloat(open),
          parseFloat(high),
          parseFloat(low),
          parseFloat(close),
          parseFloat(volume),
          parseFloat(marketcap),
        ]);
      });
  }

  res.json({
    timeline,
  });
};
