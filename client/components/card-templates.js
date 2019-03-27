import React from 'react'
import Container from 'react-bootstrap/Container'

const CardTemplates = props => (
  <div>
    <h2>Select A Card</h2>
    <Container fluid="false">
      <div>
        {props.cardTemplates.map(cardTemplate => (
          <div
            key={cardTemplate.id}
            onClick={() => props.selectCardTemplate(cardTemplate)}
          >
            <p>{cardTemplate.occasion}</p>
            <img src={cardTemplate.picture} width="120" />
          </div>
        ))}
      </div>
    </Container>
  </div>
)

export default CardTemplates
