const router = require('express').Router()
const {Card, CardTemplate} = require('../db/models')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')

module.exports = router


router.get('/cardhistory', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        senderId: req.user.id
      },
      include: [
        {
          model: CardTemplate
        }
      ]
    })
    res.json(cards)
  } catch (err) {
    next(err)
  }
})

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'c-ar-d-videos',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb) {
      cb(
        null,
        crypto
          .randomBytes(16)
          .toString('base64')
          .replace('/', '') + file.originalname
      )
    }
  })
})

const singleUpload = upload.single('video')

router.post('/create', function(req, res) {
  singleUpload(req, res, async function(err) {
    if (err) {
      return res
        .status(422)
        .send({errors: [{title: 'Video Upload Error', detail: err.message}]})
    }
    const row = await Card.create({
      senderId: req.user.id,
      message: req.body.message,
      cardTemplateId: req.body.cardTemplateId,
      video: req.file.location
    })
    // generate qrCode string
    const qrCode = `http://localhost:8080/api/cards/scan/${row.uuid}`
    row.update({qrCode})
    return res.json({uri: row.video})
  })
})

router.get('/scan/:uuid', async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        uuid: req.params.uuid
      },
      include: [
        {
          model: CardTemplate
        }
      ]
    })
    res.json(card)
  } catch (err) {
    next(err)
  }
})

router.get('/received', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        receiverId: req.user.id
      }
    })
    res.json(cards)
  } catch (err) {
    next(err)
  }
})
