var Reci = require('../../models/reci');

function getDateTime() {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        month = '0'+month;
    }
    if(day.toString().length == 1) {
        day = '0'+day;
    }
    if(hour.toString().length == 1) {
        hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        second = '0'+second;
    }
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
     return dateTime;
}


module.exports = {
  getall : function (req,res,next) {
    Reci.find({}).sort({data : -1}).exec(function(err,recis) {
      if(err){
        console.log(err);
        req.sendStatus(503);
      }else {
        res.status(200).send({'rescipe' : recis});
      }
    });
  },
  getRes10 : function (req,res,next) {
    Reci.find({})
    .sort({data : -1})
    .limit(10)
    .populate('author')
    .exec(function(err,recis) {
      if(err){
        console.log(err);
        req.sendStatus(503);
      }else {
        res.status(200).send({'rescipe' : recis});
      }
    });
  },
  create : function(req,res,next) {
    var reci  = new Reci();
    reci.author = req.user._userid;
    reci.name = req.body.name;
    if(req.body.picture === undefined){
      reci.picture = '';
    }else {
      reci.picture = req.body.picture;
    }
    reci.data = getDateTime();
    if(reci.steps === undefined){
      reci.numStep = reci.body.steps.length;
      reci.steps = reci.body.steps;
    }else {
      reci.numStep = 0;
    }

    reci.save(function (err) {
      if(err){
        res.sendStatus(503);
      }else {
        res.sendStatus(200);
      }
    });
  },
  update : function(req,res,next){
    if(req.body.reci === undefined){
      return res.sendStatus(403);
    }
    Reci.findOne({'id' : req.body.reci.id},function(err, thisreci) {
      if(err){
        res.sendStatus(503);
      }else {
        if(thisreci === null){
            res.sendStatus(403);
        }else {
          thisreci = req.body.reci;
          thisreci.save(function(err) {
            if(err){
              res.sendStatus(503);
            }else {
              res.sendStatus(200);
            }
          });
        }
      }
    });
  },

};
