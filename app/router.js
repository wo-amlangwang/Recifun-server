var middleware = require('./middleware/middleware');
var upload = require('../config/S3');
module.exports = function(app,passport) {
  app.post('/api/register',middleware.local.register);

  app.get('/api/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
      res.sendStatus(req.user? 200 : 401);
    }
  );

  app.post('/api/login', middleware.local.login);

  app.get('/api/logout',function(req,res,nest) {
    req.logout();
    res.sendStatus(200);
  });

  var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

  app.get('/',function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(form);
  });
  app.post('/upload',upload.single('image'),function (req,res) {
    res.sendStatus(200);
  });

};
