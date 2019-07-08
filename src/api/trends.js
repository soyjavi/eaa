import googleTrends from 'google-trends-api';
import sma from 'sma';

import { cache } from '../modules';

const BASE = ['gold', 'silver', 'usd'];

export default async ({ props: { period = 200, term = 'bitcoin' } }, res) => {
  const today = new Date();

  // 1. is in cache?
  const cacheKey = `trend:${today.toISOString().substring(0,10)}:${term}:${period}`;
  let cacheData = cache.get(cacheKey);
  if (cacheData) res.json(cacheData);

  // 2. calc
  const keyword = [term, ...BASE];
  const options = {
    keyword,
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (Math.floor(period) + 1)),
    // endTime: undefined,
    // hl: 'es',
    // category: 7,
    // category: 12,
    // property: 'news',
  };

  // Timeline
  let response = await googleTrends.interestOverTime({
    ...options,
    keyword,
  }).catch(error => throw new Error(error));
  const { default: { timelineData = [] } = {} } = JSON.parse(response);
  const timeline = {};
  const values = [];
  keyword.forEach(key => timeline[key] = []);

  timelineData.forEach(({ time: timestamp, value }) => {
    const time = (new Date(timestamp * 1000)).toISOString().substr(0, 10);

    keyword.forEach((key, index) => {
      if (key === term) values.push(value[index]);
      timeline[key].push({ time, value: value[index]})
    })
  });

  // Queries
  response = await googleTrends.relatedQueries({
    ...options,
    keyword: term,
  }).catch(error => throw new Error(error));
  const { default: { rankedList: [{ rankedKeyword } = {}] = [] } = {} } = JSON.parse(response);

  res.json(cache.set(cacheKey, {
    sma: {
      // 20: Math.floor(sma(values, 20).slice(-1)[0]),
      50: Math.floor(sma(values, 50).slice(-1)[0]),
      100: Math.floor(sma(values, 100).slice(-1)[0]),
      200: Math.floor(sma(values, 200).slice(-1)[0]),
    },
    timeline,
    queries: rankedKeyword.map(({ query, value }) => ({ query, value })),
  }));
};
