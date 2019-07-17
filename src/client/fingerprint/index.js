import storage from '../storage';
import entropy from './entropy';
import UUID from './uuid';

const calc = () => {
  const KEY = 'fingerprint';
  let fingerprint = storage.get(KEY);

  if (!fingerprint) {
    const sample = {
      ...entropy,
      random: Math.floor(Math.random() * (2 ** 32)),
      timestamp: new Date().getTime(),
    };

    fingerprint = UUID(Object.values(sample).join('-'));
    storage.set(KEY, fingerprint);
  }
  document.cookie = `authorization=${fingerprint}; expires=-1; path=/;`;

  return fingerprint;
};

export default calc();
