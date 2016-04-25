var favoritecontrol = require('./favoritecontrol');

module.exports = {
  create : function (req,res,next) {
    favoritecontrol.create(req).then(function(favorite) {
      res.status(200).send({favorite : favorite});
    }).catch(function(err) {
      if(err == 3){
        return res.sendStatus(403);
      }
      res.sendStatus(500);
    });
  },
  remove : function (req,res,next) {
    favoritecontrol.remove(req).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        if(err == 3) {
            return res.sendStatus(403);
        }
        res.sendStatus(500);
    });
  },
  liked : function (req,res,next) {
      favoritecontrol.liked(req).then(function(favorite) {
          res.status(200).send({ 'favorite' : favorite});
      }).catch(function (err) {
          res.sendStatus(500);
      });
  },
   getFavorites : function (req,res,next) {
       favoritecontrol.getFavorites(req).then(function(favorites) {
           res.status(200).send({ 'favorites' : favorites});
       }).catch(function (err) {
           console.log(err);
           res.sendStatus(500);
       });
   }
};
