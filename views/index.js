import fs from 'fs';
import path from 'path';

const folder = path.resolve('.', 'views');

export default (filename = 'index', values = {}) => {
  const uriFile = `${folder}/${filename}.html`;
  const { rendered: { views: {} } = global;
  
  if (!fs.existsSync(uriFile)) throw new Error(`${filename} could not read correctly.`);
  let view = fs.readFileSync(uriFile, 'utf8');
  
  Object.keys(values).forEach(key => view = view.replace(`{{${key}}}`, values[key]));
  
  return view;
}