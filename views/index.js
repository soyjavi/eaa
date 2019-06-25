import fs from 'fs';

export default (file = 'index', values = {}) => {
  const view = fs.readFileSync(`${file}.html`, 'utf8');
  
  Object.keys(values).forEach(key => view.replate(`{{${key}}}`, values[key]));
  
  // fs.readFile(`${template}.html`, 'utf8', function(error, data) {
  //   if (error) throw Error('Not exists');
  //   res.send(head + converter.makeHtml(data));
  // });
  
  return view;
}