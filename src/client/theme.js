// import dashboard from './dashboard';
// import { options } from './charts';

const LIGHT = 0;
const DARK = 1;

export { LIGHT, DARK };

export default {
  current: LIGHT,

  render(next = LIGHT) {
    if (next === this.current) return;

    this.current = next;
    const root = document.documentElement;
    const colors = next === DARK
      ? {
        bg: '#111',
        bgOpacity: 'rgba(16,16,16,0.85)',
        color: 'white',
        colorChartLine: '#555',
        colorSkeleton: '#222',
      }
      : {
        bg: 'white',
        bgOpacity: 'rgba(255,255,255,0.85)',
        color: 'black',
        colorChartLine: '#aaa',
        colorSkeleton: '#ddd',
      };

    root.style.setProperty('--bg-color', colors.bg);
    root.style.setProperty('--bg-opacity', colors.bgOpacity);
    root.style.setProperty('--color', colors.color);
    root.style.setProperty('--color-skeleton', colors.colorSkeleton);
    root.style.setProperty('--color-chart-line', colors.colorChartLine);

    // dashboard.charts.forEach(chart => chart.applyOptions(options(colors)));
  },
};
