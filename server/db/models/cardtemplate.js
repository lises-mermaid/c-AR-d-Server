const Sequelize = require('sequelize')
const db = require('../db')

const CardTemplate = db.define('cardTemplate', {
  orientation: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['H', 'V']]
    }
  },
  occasion: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  qrX: {
    type: Sequelize.INTEGER,
    defaultValue: 20
  },
  qrY: {
    type: Sequelize.INTEGER,
    defaultValue: 20
  },
  msgX: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  msgY: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = CardTemplate
