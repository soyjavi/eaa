import fs from 'fs';
import path from 'path';

const folder = path.resolve('.', 'views');

export default (filename = 'index', values = {}) => {
  const { renderer: { views } } = global;
  let view = views[filename];

  if (!view) {
    const uriFile = `${folder}/${filename}.html`;
    
    if (!fs.existsSync(uriFile)) throw new Error(`${filename} could not read correctly.`);
    view = fs.readFileSync(uriFile, 'utf8');
    views[filename] = view;
  }
  
  Object.keys(values).forEach(key => view = view.replace(`{{${key}}}`, values[key]));
  
  return view;
}