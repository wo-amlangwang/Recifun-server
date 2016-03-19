var Profile = require('../../models/profile');

module.exports = {
  logout : function (req,res) {
    req.logout();
    res.sendStatus(200);
  },
  fblogin : function(req,res) {
    if(req.user === undefined){
      return res.sendStatus(401);
    }
    Profile.findOne({ user : req.user._id},function (err,profile) {
      if(err){
        throw err;
      }
      res.status(200).send({profile : profile});
    });


  }
};
