var multer  = require('multer');
var s3 = require('multer-s3');
var uuid = require('node-uuid');


var pictureUpload = multer({
  storage: s3({
    dirname: 'uploads/photos',
    bucket: process.env.BUCKET,
    secretAccessKey: process.env.S3ACCESSKEY,
    accessKeyId: process.env.S3KEYID,
    region: 'us-east-1',
    filename: function (req, file, cb) {

      //TODO
      cb(null, uuid.v1() + '.' + file.mimetype.substring(file.mimetype.indexOf('/')+1));
    }
  })
});

module.exports = pictureUpload;
