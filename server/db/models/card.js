const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  uuid: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  senderId: {
    type: Sequelize.INTEGER
    // references: {
    //   model: 'User',
    //   key: 'id',
    //   as: 'senderId',
    // }
  },
  recieverId: {
    type: Sequelize.INTEGER
    // references: {
    //   model: 'User',
    //   key: 'id',
    //   as: 'receiverId',
    // }
  },
  qrCode: {
    type: Sequelize.STRING
  },
  video: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Card
