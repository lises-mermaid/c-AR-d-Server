const router = require('express').Router()
const {Card, CardTemplate} = require('../db/models')
const {generatePic, videoUpload, cardUpload} = require('../utils')

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

router.post('/create', function(req, res) {
  videoUpload(req, res, async function(err) {
    if (err) {
      return res
        .status(422)
        .send({errors: [{title: 'Video Upload Error', detail: err.message}]})
    }
    let card = await Card.create({
      senderId: req.body.senderId,
      message: req.body.message,
      cardTemplateId: req.body.cardTemplateId,
      video: req.file.location
    })
    // generate qrCode string
    const qrCodeLink = `http://localhost:8080/api/cards/scan/${card.uuid}`
    card.update({qrCodeLink})

    // find cardTemplate link
    const cardTemplate = await CardTemplate.findOne({
      where: {
        id: card.cardTemplateId
      }
    })
    // generate QRCode and Text images
    await generatePic(
      card.uuid,
      cardTemplate.picture,
      qrCodeLink,
      card.message,
      {x: cardTemplate.qrX, y: cardTemplate.qrY}, // qr postion
      {x: cardTemplate.msgX, y: cardTemplate.msgY} // message position
    )
    // upload the card to s3 and stoore the link in database
    await cardUpload(card.uuid)
    card = await card.update({
      link: `https://s3.amazonaws.com/c-ar-d-videos/cards/card-${card.uuid}.png`
    })
    return res.json({uri: card.link})
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
