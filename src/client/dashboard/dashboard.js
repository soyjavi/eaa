import { Candlesticks, Line } from './charts';

export default {
  charts: [],

  fetchTimeline() {
    const el = document.getElementById('chart-timeline');
    el.parentNode.classList.add('skeleton');

    fetch('http://localhost:8080/api/timeline')
      .then(async (response) => {
        el.parentNode.classList.remove('skeleton');

        const { timeline = [] } = await response.json();

        const dataSource = timeline.map(([time, open, high, low, close, volume]) => ({
          time, open, high, low, close, volume,
        }));

        this.charts.push(Candlesticks('chart-timeline', dataSource));
        // this.charts.push(Candlesticks('chart-market', dataSource));
      })
      .catch(error => console.error(error));
  },

  fetchTrend({ coin: term, period }) {
    const el = document.getElementById('chart-trend');
    el.parentNode.classList.add('skeleton');

    fetch(`http://localhost:8080/api/trends?term=${term}`)
      .then(async (response) => {
        el.parentNode.classList.remove('skeleton');

        const { sma = {}, timeline = [], queries = [] } = await response.json();
        this.charts.push(Line(el, {
          sma, term, timeline, queries,
        }));
      })
      .catch(error => console.error(error));
  },
};
