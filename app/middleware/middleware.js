var local = require('./lib/local');
var reciply = require('./lib/reciplycaller');

module.exports = {
  local : local,
  reciply : reciply,
  isAuthenticated : function (req,res,next) {
    if (req.isAuthenticated()){
      return next();
    }else {
      res.sendStatus(401);
    }
  }
};
