import events from './events';

window.eaf = {
  events,
};

const currentHour = new Date().getHours();
if (currentHour >= 19 || currentHour <= 7) window.eaf.events.theme();
