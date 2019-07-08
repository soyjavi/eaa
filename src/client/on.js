import theme, { LIGHT, DARK } from './theme';
// import dashboard from './dashboard';

export default {
  toggleTheme() {
    console.log('theme', theme);
    theme.render(theme.current === LIGHT ? DARK : LIGHT);
  },

  dialogShow(id) {
    const el = document.querySelector(`.dialog.${id}`);
    if (el) el.classList.add('visible');
  },

  dialogHide() {
    const el = document.querySelector('.dialog.visible');
    if (el) el.classList.remove('visible');
  },

  // dashboard({ coin, period = '1D' }) {
  //   dashboard.fetchTimeline();
  //   dashboard.fetchTrend({ coin, period });
  // },
};
