const router = require('express').Router()
const {CardTemplate} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cardTemplates = await CardTemplate.findAll()
    res.json(cardTemplates)
  } catch (err) {
    next(err)
  }
})
