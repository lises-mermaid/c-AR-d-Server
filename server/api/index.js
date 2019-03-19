const express = require('express')
const router = require('express').Router()
module.exports = router

// body parsing middleware
router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.use('/users', require('./users'))
router.use('/cards', require('./cards'))
router.use('/videos', require('./videos'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
