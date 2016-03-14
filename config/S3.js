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
      var filename = uuid.v1() + '.' + file.mimetype.substring(file.mimetype.indexOf('/')+1);
      req.S3url = 'https://s3-us-west-2.amazonaws.com/langwang1/uploads/photos/' + filename;
      cb(null, filename);
    }
  }),
  fileFilter : fileFilter,
  limits  : {fileSize : 1024 * 1024 * 1024}
});

function fileFilter(req, file, cb) {
  if(file.mimetype.indexOf("image") == -1){
    req.uploadToS3 = false;
    cb(null,false);
  }else {
    req.uploadToS3 = true;
    cb(null,true);
  }
}
module.exports = pictureUpload;
