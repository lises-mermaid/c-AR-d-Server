const router = require('express').Router()
const {Card, CardTemplate} = require('../db/models')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')
const fs = require('fs')

const qrImage = require('qr-image')
const text2png = require('text2png')
const jimp = require('jimp')

module.exports = router

const generatePic = template => {
  const images = [template, 'temp/QRCode.png', 'temp/message.png']
  let jimps = []

  for (let i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]))
  }
  Promise.all(jimps).then(function(data) {
    data[0].composite(data[1], 160, 520)
    data[0].composite(data[2], 20, 40)
    data[0].write('temp/card.png', function() {
      console.log('wrote the image')
    })
  })
}

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        senderId: req.user.id
      }
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
      let salt = crypto
        .randomBytes(16)
        .toString('base64')
        .replace('/', '')
        .replace('\\', '')

      cb(null, 'videos/' + salt + file.originalname)
      console.log(file)
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
      senderId: req.body.senderId,
      message: req.body.message,
      cardTemplateId: req.body.cardTemplateId,
      video: req.file.location
    })
    // generate qrCode string
    const qrCodeLink = `http://localhost:8080/api/cards/scan/${row.uuid}`
    row.update({qrCodeLink})

    // generate QRCode and Text images
    async function createQRFile() {
      return new Promise(resolve => {
        const writeToFile = fs.createWriteStream('temp/QRCode.png')
        qrImage.image(qrCodeLink, {type: 'png', size: 4}).pipe(writeToFile)
        writeToFile.on('finish', resolve)
      })
    }
    await createQRFile()

    fs.writeFileSync(
      'temp/message.png',
      text2png(row.message, {
        color: 'blue',
        font: '32px "Comic Sans MS", cursive, sans-serif'
      })
    )

    generatePic(
      'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/rabbit.png'
    )

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
