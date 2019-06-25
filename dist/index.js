'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _showdown = require('showdown');

var _showdown2 = _interopRequireDefault(_showdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var converter = new _showdown2.default.Converter();

var head = '<html lang="en"><head><title>Markdown Web Page</title></head><body><div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>';
var footer = '<script src="https://button.glitch.me/button.js" data-style="glitch"></script></body></html>';

app.use(_express2.default.static('public'));
app.set('views', './views');

app.get('/:post', function (req, res) {
  var post = req.params.post;


  _fs2.default.readFile('posts/' + post + '.md', 'utf8', function (error, data) {
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
//# sourceMappingURL=index.js.map