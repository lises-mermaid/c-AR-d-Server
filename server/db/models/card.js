const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  uuid: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  qrCode: {
    type: Sequelize.STRING
  },
  video: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Card
