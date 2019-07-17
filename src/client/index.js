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

// -- auto-config
on.modeSubscribed(storage.get('subscribe'));

if (document.querySelector('main').getAttribute('data-role') === 'admin') theme.render(DARK);
else {
  const currentHour = new Date().getHours();
  theme.render((currentHour >= 19 || currentHour <= 6) ? DARK : LIGHT);
}
