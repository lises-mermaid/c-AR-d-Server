import React from 'react'

const CardTemplates = props => (
  <div>
    <h2>Select A Card</h2>
    <h5>Birthday</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Birthday')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
    <h5>Wedding</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Wedding')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
    <h5>Retirement</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Retirement')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
    <h5>Baby Shower</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Baby Shower')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
    <h5>Anniversary</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Anniversary')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
    <h5>Farewell</h5>
    <div>
      {props.cardTemplates
        .filter(cardTemplate => cardTemplate.occasion === 'Farewell')
        .map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() =>
              props.selectCardTemplate('cardTemplate', cardTemplate)
            }
          >
            <img src={cardTemplate.picture} height="140" width="120" />
          </div>
        ))}
    </div>
  </div>
)

export default CardTemplates
