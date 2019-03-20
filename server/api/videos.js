const router = require('express').Router()
const fs = require('fs')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const {Card} = require('../db/models')
// crypto
const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

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
  singleUpload(req, res, async function(err, some) {
    if (err) {
      return res
        .status(422)
        .send({errors: [{title: 'Video Upload Error', detail: err.message}]})
    }
    const row = await Card.create({
      senderId: req.body.senderId,
      message: req.body.message,
      cardTemplateId: req.body.cardTemplateId,
      video: req.file.location
    })
    console.log(row.uuid)
    // generate encrypted url

    return res.json(row)
  })
})

router.get('/stream', async (req, res, next) => {
  const qrCode = req.body.qrCode
})

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  })
}

function decrypt(text) {
  text = JSON.parse(text)
  let iv = Buffer.from(text.iv, 'hex')
  let encryptedText = Buffer.from(text.encryptedData, 'hex')
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
