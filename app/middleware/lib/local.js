module.exports = {
  logout : function (req,res) {
    req.logout();
    res.sendStatus(200);
  },
  fblogin : function(req,res) {
    res.sendStatus(req.user? 200 : 401);
  }
};
