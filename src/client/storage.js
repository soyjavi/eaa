const BASE = 'eaf';

export default {
  get(key) {
    const value = window.localStorage.getItem(`${BASE}:${key}`);

    return value ? JSON.parse(value) : undefined;
  },

  set(key, value) {
    if (!value) window.localStorage.removeItem(`${BASE}:${key}`);
    else window.localStorage.setItem(`${BASE}:${key}`, JSON.stringify(value));

    return value;
  },
};
