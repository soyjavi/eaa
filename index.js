import fs from 'fs';
import express from 'express';
import showdown from 'showdown';
import view from './views';
import posts from './store/posts.json';

const app = express();
const converter = new showdown.Converter();

global.renderer = { post: {}, views: {} };

app.use(express.static('public'));
app.set('views', './views');

app.get('/:postUri', function(req, res) {
  const { params: { postUri } } = req;
  const post = posts.find(({ uri }) => uri === postUri);
  
  if (!post) res.send(`Post ${postUri} doesnt exist`);
  
  fs.readFile(`posts/${post.uri}.md`, 'utf8', function(error, markdown) {
    if (error) return res.redirect('/');
    res.send(view('index', { 
      main: view('post', { 
        title: post.title,
        
        markdown: converter.makeHtml(markdown) 
      }), 
    }));
  })
});

// app.get('/', (req, res) => res.send(view('index', { content: 'hola' })));
app.get('/', (req, res) => res.redirect('/welcome'));

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
