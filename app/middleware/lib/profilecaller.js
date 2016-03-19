var profilecontrol = require('./profilecontrol');

module.exports = {
  get : function (req,res,next) {
    profilecontrol.get(req).then(function(profile) {
      res.status(200).send({profile : profile});
    }).catch(function(err) {
      if(err == 3){
        return res.sendStatus(403);
      }
      res.sendStatus(500);
    });
  }
};
