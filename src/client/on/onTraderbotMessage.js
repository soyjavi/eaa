import { C } from '../../common';
import queryString from './modules/queryString';

const { API } = C;

export default async (button, messageTemplate) => {
  const textarea = document.querySelector('[data-role="admin"] textarea');

  if (messageTemplate) {
    textarea.value = messageTemplate;
    return;
  }

  const { value: message } = textarea;
  if (!message || message.trim().length === 0) return;

  button.classList.add('spinner');
  // button.setAttribute('disabled');

  const response = await fetch('/api/traderbot', {
    headers: { ...API.HEADERS },
    method: 'POST',
    body: queryString({ message: message.trim() }),
  }).catch(e => console.error(e));

  if (response) {
    textarea.value = '';
  }

  button.classList.remove('spinner');
};
