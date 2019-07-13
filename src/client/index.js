import fingerprint from './fingerprint';
import on from './on';
import storage from './storage';
import theme, { LIGHT, DARK } from './theme';

window.eaf = {
  fingerprint,
  on,
  storage,
  theme,
};

// -- Autoconfig
on.modeSubscribed(storage.get('subscribe'));

const currentHour = new Date().getHours();
theme.render((currentHour >= 19 || currentHour <= 6) ? DARK : LIGHT);
