const router = require('express').Router()
const fs = require('fs')
const AWS = require('aws-sdk')
const {AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} = require('../../secrets')
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})
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

router.get('/recieved', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        recieverId: req.user.id
      }
    })
    res.json(cards)
  } catch (err) {
    next(err)
  }
})
