var commentcontrol = require('./commentcontrol');

module.exports = {
  create : function (req,res,next) {
    commentcontrol.create(req).then(function(comment) {
      res.status(200).send({comment : comment});
    }).catch(function(err) {
      if(err == 3){
        return res.sendStatus(403);
      }
      console.log(err);
      res.sendStatus(500);
    });
  },
  remove : function (req,res,next) {
    commentcontrol.remove(req).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        if(err == 3) {
            return res.sendStatus(403);
        }
        console.log(err);
        res.sendStatus(500);
    });
  },
   getComments : function (req,res,next) {
       commentcontrol.getComments(req).then(function(comments) {
           res.status(200).send({ 'comments' : comments});
       }).catch(function (err) {
           console.log(err);
           res.sendStatus(500);
       });
   }
};
