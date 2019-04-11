const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const s3 = new aws.S3({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: 'us-east-1'
});
const fileFilter = (req, file, callback) => {
   // console.log("request --------",req);
    
    console.log("file---------",file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'fundoonotess',
        acl: 'public-read',
        metadata: function (req, file, callback) {
            callback(null, {
                fieldName: 'TESTING_META_DATA!'
            });
        },
        key: function (req, file, callback) {
            callback(null, Date.now().toString())
        }
    })
})
module.exports = upload;