var path = require('path');
var compression = require('compression');
var express = require('express');
var app = express();

var forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
};

app.use(compression());

app.use(forceSSL());

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
