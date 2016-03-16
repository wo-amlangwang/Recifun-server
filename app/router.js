var middleware = require('./middleware/middleware');
var upload = require('../config/S3');
module.exports = function(app,passport) {
  app.post('/api/register',middleware.local.register);

  app.get('/api/facebook/token',
    passport.authenticate('facebook-token'),
    middleware.local.fblogin);

  app.post('/api/login', middleware.local.login);

  app.get('/api/logout',middleware.local.logout);

  var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/api/pictureUpload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

  app.get('/',function(req,res,next) {
    //res.writeHead(200, {'Content-Type': 'text/html' });
    //res.end(form);
  });
  app.post('/api/pictureUpload',upload.single('image'),function (req,res) {
    if(req.uploadToS3){
      res.status(200).send({'url' : req.S3url});
    }else {
      res.sendStatus(403);
    }
  });

  app.post('/api/newRecipe',middleware.isAuthenticated,middleware.reci.create);

};
