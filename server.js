import express from 'express';
const fs = require('fs');
const showdown = require('showdown');

const app = express();
const converter = new showdown.Converter();

const head = '<html lang="en"><head><title>Markdown Web Page</title></head><body><div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>'
const footer = '<script src="https://button.glitch.me/button.js" data-style="glitch"></script></body></html>'

app.use(express.static('public'));
app.set('views', './views');


app.get('/:post', function(req, res) {
  const { params: { post } } = req;
  
  fs.readFile(`posts/${post}.md`, 'utf8', function(error, data) {
    if (error) return res.redirect('/');
    res.send(head + converter.makeHtml(data) + footer);
  })
});

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));


const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
