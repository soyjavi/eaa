import { LineStyle } from 'lightweight-charts';

export default () => {
  const root = document.documentElement;

  const bg = root.style.getPropertyValue('--bg-color');
  const bgOpacity = root.style.getPropertyValue('--bg-opacity');
  const color = root.style.getPropertyValue('--color');
  const colorLighten = root.style.getPropertyValue('--color-lighten');
  const colorSkeleton = root.style.getPropertyValue('--color-skeleton');
  const colorChartLine = root.style.getPropertyValue('--color-chart-line');

  return ({
    layout: {
      backgroundColor: colorSkeleton,
      textColor: color,
    },
    crosshair: {
      vertLine: {
        visible: false,
        width: 4,
        color: colorChartLine,
        style: 0,
        labelVisible: false,

      },
      horzLine: {
        visible: false,
        labelVisible: false,
      },
      // mode: CrosshairMode.Normal,
    },
    // crosshair: {
    //   mode: CrosshairMode.Normal,
    // },
    grid: {
      vertLines: {
        color: colorChartLine,
        style: LineStyle.SparseDotted,
        visible: false,
      },
      horzLines: {
        color: colorChartLine,
        style: LineStyle.SparseDotted,
      },
    },
    handleScroll: { mouseWheel: false },
    handleScale: { mouseWheel: false },
    localization: {
      priceFormatter: value => parseInt(value),
    },
    priceScale: {
      // autoScale: true,
      // alignLabels: true,
      borderVisible: false,
      // borderColor: 'rgba(0, 0, 0, 0)',
      // scaleMargins: { bottom: 0.2, top: 0.3 },
      scaleMargins: { top: 0.05, bottom: 0.05 },
    },
    timeScale: { borderVisible: false, rightOffset: 10 },

  });
};
