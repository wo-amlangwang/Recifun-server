module.exports = {
  register : function(req,res,next) {
    passport.authenticate('local-register',function(err,user,info) {
      if(err){
        if(req.isAuthenticated()){
          req.logout();
        }
        res.sendStatus(503);
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
  },
  login : function(req,res,next) {
    passport.authenticate('local-login',function(err,user,info) {
      if(err){
        if(req.isAuthenticated()){
          req.logout();
        }
        res.sendStatus(503);
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
  }
};
