// server.js
// where your node app starts

// init project
const express = require('express');
const fs = require('fs');
const showdown = require('showdown');

const app = express();
const converter = new showdown.Converter();

const head = '<html lang="en"><head><title>Markdown Web Page</title></head><body><div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>'
const footer = '<script src="https://button.glitch.me/button.js" data-style="glitch"></script></body></html>'

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get('/:post', function(req, res) {
  const { params: { post } } = req;
  
  fs.readFile(`posts/${post}.md`, 'utf8', function(err, data) {
    if (err) {
      res.redirect('/' + string);
      return console.log(err);
    }
    res.send(head + converter.makeHtml(data) + footer);
  })
});

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));


const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
