const multerS3 = require('multer-s3');
const multer = require('multer'); 
const AWS = require('aws-sdk');
 
AWS.config.update({
    region: 'ap-northeast-2',
});

const storage = multerS3({
    s3: new AWS.S3(),
    bucket: 'ywoosang-s3',
    async key(req, file, cb) {
        try {
            const filePathName = `${Date.now()}-${file.originalname}`;
            cb(null, filePathName);
        } catch (err) {
            console.log(err);
        }
    }
});

const upload = multer({
    storage
});

module.exports = upload;