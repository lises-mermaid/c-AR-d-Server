const router = require('express').Router()
const fs = require('fs')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')

module.exports = router

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'c-ar-d-videos',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb) {
      // cb(null, file.originalname)
      cb(
        null,
        crypto
          .randomBytes(16)
          .toString('base64')
          .replace('/', '') + file.originalname
      )
      console.log(file)
    }
  })
})

const singleUpload = upload.single('video')

router.post('/upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res
        .status(422)
        .send({errors: [{title: 'Video Upload Error', detail: err.message}]})
    }
    return res.json({videoUrl: req.file.location})
  })
})
