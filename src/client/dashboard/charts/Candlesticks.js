import { createChart, CrosshairMode } from 'lightweight-charts';

export default (selector, data = []) => {
  const el = document.getElementById(selector);

  // const chart = createChart(el, { _width: 400, _height: 300 });
  // const lineSeries = chart.addLineSeries();
  // lineSeries.setData([
  //     { time: '2019-04-11', value: 80.01 },
  //     { time: '2019-04-12', value: 96.63 },
  //     { time: '2019-04-13', value: 76.64 },
  //     { time: '2019-04-14', value: 81.89 },
  //     { time: '2019-04-15', value: 74.43 },
  //     { time: '2019-04-16', value: 80.01 },
  //     { time: '2019-04-17', value: 96.63 },
  //     { time: '2019-04-18', value: 76.64 },
  //     { time: '2019-04-19', value: 81.89 },
  //     { time: '2019-04-20', value: 74.43 },
  // ]);


  const chart = createChart(el, {
    // width: 600,
    // height: 300,
    layout: {
      backgroundColor: '#000000',
      textColor: 'rgba(255, 255, 255, 0.9)',
      margin: 10,
    },
    grid: {
      vertLines: {
        color: 'rgba(255, 255, 255, 0)',
      },
      horzLines: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: 'rgba(0, 0, 0, 0)',
    },
    timeScale: {
      borderColor: 'rgba(0, 0, 0, 0)',
      rightOffset: 10,
    },
  });

  var candleSeries = chart.addCandlestickSeries({
    // upColor: 'rgba(255, 144, 0, 1)',
    // downColor: '#000',
    // borderDownColor: 'rgba(255, 144, 0, 1)',
    // borderUpColor: 'rgba(255, 144, 0, 1)',
    // wickDownColor: 'rgba(255, 144, 0, 1)',
    // wickUpColor: 'rgba(255, 144, 0, 1)',
  });

  var volumeSeries = chart.addHistogramSeries({
    color: '#26a69a',
    lineWidth: 4,
    priceFormat: {
      type: 'volume',
    },
    overlay: true,
    scaleMargins: {
      top: 0.9,
      bottom: 0,
    },
  });

  chart.timeScale().fitContent();
  // chart.timeScale().scrollToPosition(-20, false);
  // chart.timeScale().scrollToRealTime();

  candleSeries.setData(data);
  volumeSeries.setData(data.map(({ time, volume: value }) => ({ time, value, color: 'rgba(255, 255, 255, 0.33)' })));


  return chart;
};
