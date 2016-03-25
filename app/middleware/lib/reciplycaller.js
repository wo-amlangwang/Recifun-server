var reciplycontrol = require('./reciplycontrol');
module.exports = {
  create : function (req,res,next) {
    reciplycontrol.create(req).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(500);
    });
  },
  getall : function (req,res,next) {
    reciplycontrol.getall().then(function(reciplys) {
      res.status(200).send({ 'reciplys' : reciplys});
    }).catch(function (err) {
      res.sendStatus(500);
    });
  },
  getOne : function (req,res,next) {
    reciplycontrol.getOne(req).then(function (reciply) {
      res.status(200).send({'reciply' : reciply});
    }).catch(function (err) {
      res.sendStatus(500);
    });
  },
  update : function (req,res,next) {
    reciplycontrol.update(req).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      if(err == 3){
        return res.sendStatus(404).send({'message' : 'no right to do this'});
      }
      if(err == 4){
        return res.status(404).send({'message' : 'other user is updating this file'});
      }
      res.sendStatus(500);
    });
  },
  remove : function (req,res,next) {
    reciplycontrol.remove(req).then(function () {
      res.sendStatus(200);
    }).catch(function (err) {
      if(err == 3) {
        return res.sendStatus(403);
      }
      res.sendStatus(500);
    });
  }
};
