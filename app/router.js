var middleware = require('./middleware/middleware');
var upload = require('../config/S3');
module.exports = function(app,passport) {
  app.post('/api/register',function(req,res,next) {
    passport.authenticate('local-register',function(err,user,info) {
      if(err){
        if(req.isAuthenticated()){
          req.logout();
        }
        return res.sendStatus(503);
      }
      if(user){
        req.login(user,function(err) {
          if(err){
            res.sendStatus(503);
          }else {
            res.sendStatus(200);
          }
        });
      }else {
        if(req.isAuthenticated()){
          req.logout();
        }
        res.sendStatus(401);
      }
    })(req,res,next);
  });

  app.get('/api/facebook/token',
    passport.authenticate('facebook-token'),
    middleware.local.fblogin);

  app.post('/api/login', function(req,res,next) {
    passport.authenticate('local-login',function(err,user,info) {
      if(err){
        if(req.isAuthenticated()){
          req.logout();
        }
        console.log(err);
        return res.sendStatus(503);
      }
      if(user){
        req.login(user,function(err) {
          if(err){
            res.sendStatus(503);
          }else {
            res.sendStatus(200);
          }
        });
      }else {
        if(req.isAuthenticated()){
          req.logout();
        }
        res.sendStatus(401);
      }
    })(req,res,next);
  });

  app.get('/api/logout',middleware.local.logout);
/*
  var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/api/pictureUpload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";
*/
  app.get('/',function(req,res,next) {
    //res.writeHead(200, {'Content-Type': 'text/html' });
    //res.end(form);
  });

  app.post('/api/reciply',middleware.isAuthenticated,middleware.reciply.create);

  app.get('/api/reciply/:_id',middleware.reciply.getOne);
  app.get('/api/reciplys',middleware.reciply.getall);

  app.patch('/api/reciply',middleware.isAuthenticated,middleware.reciply.update);

  app.delete('/api/reciply', middleware.isAuthenticated,middleware.reciply.remove);

  app.post('/api/pictureUpload',upload.single('image'),function (req,res) {
    if(req.uploadToS3){
      res.status(200).send({'url' : req.S3url});
    }else {
      res.sendStatus(403);
    }
  });

};
