var local = require('./lib/local');
var reciply = require('./lib/reciplycaller');
var profile = require('./lib/profilecaller');

module.exports = {
  local : local,
  reciply : reciply,
  profile : profile,
  isAuthenticated : function (req,res,next) {
    if (req.isAuthenticated()){
      return next();
    }else {
      res.sendStatus(401);
    }
  },
  islogin : function (req,res,next) {
    if (req.isAuthenticated()){
      res.sendStatus(200);
    }else {
      res.sendStatus(401);
    }
  }
};
