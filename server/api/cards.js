const router = require('express').Router()
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
