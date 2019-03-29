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
        .replace(/\//gi, '')

      cb(null, 'videos/' + salt + file.originalname)
      console.log(file)
    }
  })
})
const videoUpload = uploadVideo.single('video')

// generate card locally
const generatePic = async (
  uuid,
  template,
  qrCodeLink,
  message,
  qrPos,
  msgPos
) => {
  const images = [
    template,
    `temp/QRCode-${uuid}.png`,
    `temp/message-${uuid}.png`
  ]
  let jimps = []
  // QR Code
  async function createQRFile() {
    return new Promise(resolve => {
      const writeToFile = fs.createWriteStream(images[1])
      qrImage.image(qrCodeLink, {type: 'png', size: 4}).pipe(writeToFile)
      writeToFile.on('finish', resolve)
    })
  }
  await createQRFile()
  // Message
  fs.writeFileSync(
    images[2],
    text2png(message, {
      color: 'black',
      font: '42px "Lucida Console", Monaco, monospace',
      lineSpacing: 10,
      textAlign: 'center'
    })
  )
  // Generate final card

  for (let i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]))
  }
  await Promise.all(jimps).then(function(data) {
    data[0].composite(data[1], qrPos.x, qrPos.y)
    data[0].composite(data[2], msgPos.x, msgPos.y)
    data[0].write(`temp/card-${uuid}.png`, function() {
      console.log('card created')
      fs.unlink(images[1], err => {
        if (err) throw err
        console.log('successfully deleted temporary QR code image')
      })
      fs.unlink(images[2], err => {
        if (err) throw err
        console.log('successfully deleted temporary text image')
      })
    })
  })
}

// upload finished card
const cardUpload = async uuid => {
  await fs.readFile(`temp/card-${uuid}.png`, function(err, data) {
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
        fs.unlink(`temp/card-${uuid}.png`, err => {
          if (err) throw err
          console.log('successfully deleted temporary card image')
        })
      }
    })
  })
}
// turn one long string into a multi-line string
const wrap = (line, maxLen) => {
  if (line.length <= maxLen) {
    return line
  }

  const indexOfBlank = line.lastIndexOf(' ', maxLen)
  let split, offset
  if (indexOfBlank > -1) {
    split = indexOfBlank
    offset = 1
  } else {
    split = maxLen
    offset = 0
  }

  return (
    line.substring(0, split) +
    '\n' +
    wrap(line.substring(split + offset), maxLen)
  )
}
module.exports = {
  generatePic,
  videoUpload,
  cardUpload,
  wrap
}
