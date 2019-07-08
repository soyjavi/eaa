import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import PKG from '../../package.json';
import cache from './cache';

dotenv.config();
const {
  DOMAIN, TITLE, DESCRIPTION, FAVICON,
} = process.env;
const folder = path.resolve('.', 'views');
const bindingRegexp = new RegExp(/{{.*}}/, 'g');


export default (filename = 'index', values = {}) => {
  const cacheKey = `view:${filename}`;
  let view = cache.get(cacheKey);

  if (!view) {
    const uriFile = `${folder}/${filename}.html`;
    if (!fs.existsSync(uriFile)) throw new Error(`${filename} could not read correctly.`);
    view = fs.readFileSync(uriFile, 'utf8');

    cache.set(cacheKey, view);
  }

  const dataSource = Object.assign({}, values, {
    DOMAIN, TITLE, DESCRIPTION, FAVICON, VERSION: PKG.version,
  });

  Object.keys(dataSource).forEach((key) => {
    view = view.replace(new RegExp(`{{${key}}}`, 'g'), dataSource[key]);
  });

  // @TODO: Clean all {{}}
  view = view.replace(bindingRegexp, '');

  return view;
};
