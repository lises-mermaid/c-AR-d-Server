import React from 'react'

const CardTemplates = props => (
  <div>
    <h2>Select A Card</h2>
    <div>
      {props.cardTemplates.map(cardTemplate => (
        <div
          key={cardTemplate.id}
          onClick={() => props.selectCardTemplate('cardTemplate', cardTemplate)}
        >
          <p>{cardTemplate.occasion}</p>
          <img src={cardTemplate.picture} height="140" width="120" />
        </div>
      ))}
    </div>
  </div>
)

export default CardTemplates
