const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  senderId: {
    type: Sequelize.INTEGER
  },
  recieverId: {
    type: Sequelize.INTEGER
  },
  qrCode: {
    type: Sequelize.UUID
  },
  video: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Card
