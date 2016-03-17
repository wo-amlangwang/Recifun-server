var local = require('./lib/local');

module.exports = {
  local : local,
  isAuthenticated : function (req,res,next) {
    if (req.isAuthenticated()){
      return next();
    }else {
      res.sendStatus(401);
    }
  }
};
