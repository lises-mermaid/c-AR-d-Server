const router = require('express').Router()
const {Card, CardTemplate} = require('../db/models')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')
const qrCode = require('qrcode')
const fs = require('fs')
const PDFDocumentCard = require('pdfkit')
const nodemailer = require('nodemailer')

module.exports = router

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

    generatePDF(row.cardTemplate, row.message, row.video)

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

const generatePDF = (cardTemplate, message, video, email) => {
  // var qrSvg = qr.image(video, { type: 'svg' });

  //   qrSvg.pipe(require('fs').createWriteStream('i_love_qr.svg'));

  //   var svgString = qr.imageSync('I love QR!', { type: 'svg' });
  //   console.log(qrSvg)
  //   console.log(svgString)
  var imgUrl
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 0.3
    }
  }
  qrCode.create(message, opts)
  qrCode.toCanvas('testing')
  qrCode.toDataURL(message, opts, function(err, url) {
    if (err) throw err

    imgUrl = url
    console.log(imgUrl[0], 'qr LINK')
  })

  const doc = new PDFDocumentCard()

  // let buffers = [];
  // doc.on('data', buffers.push.bind(buffers));
  // doc.on('end', () => {

  //     let pdfData = Buffer.concat(buffers);

  //     const mailOptions = {
  //         from: 'jtoahacoding@gmail.com',
  //         to: 'jtoahacoding@gmail.com',
  //         attachments: [{
  //             filename: 'attachment.pdf',
  //             content: pdfData
  //         }]
  //     };

  //     mailOptions.subject = 'PDF in mail';
  //     mailOptions.text = 'PDF attached';
  //     return mailTransporter.sendMail(mailOptions).then(() => {
  //         console.log('email sent:');
  //     }).catch(error => {
  //         console.error('There was an error while sending the email:', error);
  //     });

  // });

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('card.pdf'))

  doc.fontSize(25).text('Happy Birthday!', 100, 100)
  // Embed a font, set the font size, and render some text
  doc.fontSize(25).text(message, 100, 100)

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  // doc.image(imgUrl, {
  //   //  fit: [250, 300],
  //    align: 'center',
  //    valign: 'center'
  // });

  // Draw a triangle
  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300')

  // // Add some text with annotations
  // doc.addPage()
  //    .fillColor("blue")
  //    .text('Here is a link!', 100, 100)
  //    .underline(100, 100, 160, 27, {color: "#0000FF"})
  //    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file

  doc.end()
  //console.log("START", doc)
}
