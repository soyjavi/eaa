import fs from 'fs';

export default (template = 'index', values) => {
  fs.readFile(`${template}.html`, 'utf8', function(error, data) {
    if (error) throw Error('Not exists');
    res.send(head + converter.makeHtml(data));
  });
}