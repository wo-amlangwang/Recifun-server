var local = require('./lib/local');
var reci = require('./lib/reci');
module.exports = {
  local : local,
  reci  : reci,
  isAuthenticated : function (req,res,next) {
    if (req.isAuthenticated()){
      return next();
    }else {
      res.sendStatus(401);
    }
  }
};
