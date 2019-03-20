const router = require('express').Router()
const fs = require('fs')
const AWS = require('aws-sdk')
const {User, Card} = require('../db/models')
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

router.post('/create', async (req, res, next) => {
  try {
    await Card.create({
      senderId: req.body.senderId,
      qrCode: req.body.qrCode,
      video: req.body.video,
      message: req.body.message
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.get('/received', async (req, res, next) => {
  try {
    // const cards = await Card.findAll({
    //   where: {
    //     receiverId: req.user.id
    //   }
    // })
    res.json('cards')
  } catch (err) {
    next(err)
  }
})
