const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')

const fs = require('fs')
const qrImage = require('qr-image')
const text2png = require('text2png')
const jimp = require('jimp')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})
const s3 = new AWS.S3()
// upload video
const uploadVideo = multer({
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
const videoUpload = uploadVideo.single('video')

// generate card locally
const generatePic = async (template, qrCodeLink, message, qrPos, msgPos) => {
  // QR Code
  async function createQRFile() {
    return new Promise(resolve => {
      const writeToFile = fs.createWriteStream('temp/QRCode.png')
      qrImage.image(qrCodeLink, {type: 'png', size: 4}).pipe(writeToFile)
      writeToFile.on('finish', resolve)
    })
  }
  await createQRFile()
  // Message
  fs.writeFileSync(
    'temp/message.png',
    text2png(message, {
      color: 'black',
      font: '42px "Comic Sans MS", cursive, sans-serif',
      lineSpacing: 10,
      textAlign: 'center'
    })
  )
  // Generate final card
  const images = [template, 'temp/QRCode.png', 'temp/message.png']
  let jimps = []

  for (let i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]))
  }
  Promise.all(jimps).then(function(data) {
    data[0].composite(data[1], qrPos.x, qrPos.y)
    data[0].composite(data[2], msgPos.x, msgPos.y)
    data[0].write('temp/card.png', function() {
      console.log('card created')
    })
  })
}

// upload finished card
const cardUpload = async uuid => {
  fs.readFile('temp/card.png', function(err, data) {
    if (err) {
      throw err
    }
    params = {
      Bucket: 'c-ar-d-videos',
      Key: `cards/card-${uuid}.png`,
      ACL: 'public-read',
      Body: data
    }
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully uploaded card to S3')
      }
    })
  })
}
module.exports = {
  generatePic,
  videoUpload,
  cardUpload
}
