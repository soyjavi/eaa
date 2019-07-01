import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import cache from './cache';

dotenv.config();
const {
  DOMAIN, TITLE, DESCRIPTION, FAVICON,
} = process.env;
const folder = path.resolve('.', 'views');

export default (filename = 'index', values = {}) => {
  const keyCache = `view:${filename}`;
  let view = cache.get(keyCache);

  if (!view) {
    const uriFile = `${folder}/${filename}.html`;
    if (!fs.existsSync(uriFile)) throw new Error(`${filename} could not read correctly.`);
    view = fs.readFileSync(uriFile, 'utf8');

    cache.set(keyCache, view);
  }

  const dataSource = Object.assign({}, values, {
    DOMAIN, TITLE, DESCRIPTION, FAVICON,
  });
  Object.keys(dataSource).forEach((key) => {
    view = view.replace(new RegExp(`{{${key}}}`, 'g'), dataSource[key]);
  });

  return view;
};
