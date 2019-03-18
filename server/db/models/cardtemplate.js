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
  }
})

module.exports = CardTemplate
