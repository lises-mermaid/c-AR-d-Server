const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('../auth/is-admin')
module.exports = router

router.get('/', [isAdmin], async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
