import { createChart, LineStyle } from 'lightweight-charts';
import options from './options';

const COLOR = {
  bitcoin: '#f7931a',
  ethereum: 'purple',
  gold: '#FFD700',

  20: 'white',
  50: 'green',
  100: 'blue',
  200: 'red',
};

export default (el, { sma, term, timeline = {} }) => {
  const chart = createChart(el, options());

  Object.keys(timeline).map(key => chart
    .addLineSeries({ color: COLOR[key], lineWidth: 3 })
    .setData(timeline[key]));

  const today = (new Date()).toISOString().substring(0, 10);
  Object.keys(sma).map(key => chart
    .addLineSeries({ color: COLOR[key] })
    .setData([{ time: today, value: sma[key] }]));

  chart.timeScale().fitContent();

  const toolTip = document.createElement('div');
  toolTip.className = 'tooltip';
  el.appendChild(toolTip);

  chart.subscribeCrosshairMove((param) => {
    if (!param.time) {
      toolTip.style.display = 'none';
      return;
    }

    const { year, day, month } = param.time;
    const iterator = param.seriesPrices.values();
    toolTip.style.display = 'flex';
    toolTip.innerHTML = '';
    Object.keys(timeline).forEach((key) => {
      const { value } = iterator.next();
      toolTip.innerHTML += `
        <div style="order: ${-value};">
          <small style="color: ${COLOR[key]};">⬤ ${key}</small>
          <h3>${value}</h3>
        </div>
      `;
    });

    Object.keys(sma).forEach((key) => {
      toolTip.innerHTML += `
        <div style="order: ${-sma[key]};">
          <small style="color: ${COLOR[key]};">⬤ sma:${key}</small>
          <strong>${sma[key]}</strong>
        </div>`;
    });

    toolTip.innerHTML += `<small>${new Date(year, month - 1, day).toLocaleDateString()}</small>`;
    toolTip.style.left = `${param.point.x}px`;
  });

  return chart;
};
