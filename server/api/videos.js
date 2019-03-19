const router = require('express').Router()
const fs = require('fs')
const AWS = require('aws-sdk')
const Busboy = require('busboy')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const {User, Card} = require('../db/models')
module.exports = router

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'c-ar-d-videos'
  })
  s3bucket.createBucket(function() {
    var params = {
      Bucket: 'BUCKET_TEST',
      Key: file.name,
      Body: file.data
    }
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log('error in callback')
        console.log(err)
      }
      console.log('success')
      console.log(data)
    })
  })
}

router.get('/', function(req, res, next) {
  res.send('hi')
})

router.post('/upload', function(req, res, next) {
  //const element1 = req.body.element1
  console.log(req.body)
  // var busboy = new Busboy({headers: req.headers})

  // The file upload has completed
  //busboy.on('finish', function() {
  console.log('Upload finished')
  // Grabs your file object from the request.
  //const file = req.files.element2
  // console.log(file, "HEEEOLLO")

  // Begins the upload to the AWS S3
  // uploadToS3(file)
  //})

  //req.pipe(busboy);
})
