const User = require('./user')
const CardTemplate = require('./cardtemplate')
const Card = require('./card')

CardTemplate.hasMany(Card)
Card.belongsTo(CardTemplate)
User.hasMany(Card, {as: 'senderId', foreignKey: 'senderId'})
User.hasMany(Card, {as: 'receiverId', foreignKey: 'receiverId'})

module.exports = {
  User,
  CardTemplate,
  Card
}
