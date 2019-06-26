import fs from 'fs';
import express from 'express';
import showdown from 'showdown';
import render from './src/modules/render';
import posts from './store/posts.json';

const app = express();
const converter = new showdown.Converter();

global.renderer = { post: {}, views: {} };

app.use(express.static('public'));

// Endpoints
app.get('/error', (req, res) => res.send(render('index')));

app.get('/dashboard', (req, res) => res.json({ endpoint: 'dashboard' }));

app.get('/signin', (req, res) => res.json({ endpoint: 'signin' }));

app.get('/:postUri', function(req, res) {
  const { params: { postUri } } = req;
  const post = posts.find(({ uri }) => uri === postUri);
  
  if (!post) res.redirect('/error');
  
  fs.readFile(`posts/${post.uri}.md`, 'utf8', function(error, markdown) {
    if (error) return res.redirect('/error');
    res.send(render('index', { 
      main: render('post', {
        // ...post, @TODO: Babel config
        title: post.title,
        date: post.date,
        author: post.author,
        avatar: post.avatar,        
        markdown: converter.makeHtml(markdown) 
      }), 
    }));
  })
});

// app.get('/', (req, res) => res.send(render('index', { content: 'hola' })));
app.get('/', (req, res) => res.redirect('/welcome'));

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
