// import dashboard from './dashboard';
import on from './on';
import theme, { LIGHT, DARK } from './theme';

window.eaf = {
  // dashboard,
  on,
  theme,
};

const currentHour = new Date().getHours();
theme.render((currentHour >= 19 || currentHour <= 6) ? DARK : LIGHT);

// theme.render(DARK);
