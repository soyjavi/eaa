'use strict';

var express = require('express');
var fs = require('fs');
var showdown = require('showdown');

var app = express();
var converter = new showdown.Converter();

var head = '<html lang="en"><head><title>Markdown Web Page</title></head><body><div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>';
var footer = '<script src="https://button.glitch.me/button.js" data-style="glitch"></script></body></html>';

app.use(express.static('public'));
app.set('views', './views');

app.get('/:post', function (req, res) {
  var post = req.params.post;


  fs.readFile('posts/' + post + '.md', 'utf8', function (error, data) {
    if (error) return res.redirect('/');
    res.send(head + converter.makeHtml(data));
  });
});

app.get('/', function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
//# sourceMappingURL=server.js.map