import fs from 'fs';
import express from 'express';
import showdown from 'showdown';
import renderer from './src/modules/renderer';
import view from './views';

const app = express();
const converter = new showdown.Converter();

global.renderer = { post: {}, views: {} };

app.use(express.static('public'));
app.set('views', './views');

app.get('/:post', function(req, res) {
  const { params: { post } } = req;
  
  fs.readFile(`posts/${post}.md`, 'utf8', function(error, data) {
    if (error) return res.redirect('/');
    res.send(view('index', { content: converter.makeHtml(data) }));
  })
});

// app.get('/', (req, res) => res.send(view('index', { content: 'hola' })));
app.get('/', (req, res) => res.redirect('/welcome'));

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
