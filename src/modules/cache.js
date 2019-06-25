export default {
  get: (key) => global.cache[key],
  
  set: (key, value) => {
    if (value) global.cache[key] = value;
    else delete global.cache[key];
  },
}