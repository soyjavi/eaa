import fs from 'fs';
import express from 'express';
import showdown from 'showdown';
import render from './src/modules/render';
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
