import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const CardTemplates = props => {
  return (
    <div>
      <h2>Select A Card</h2>
      <br />
      <Container>
        <h5>Birthday</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Birthday')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
        <br />
        <h5>Wedding</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Wedding')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
        <br />
        <h5>Retirement</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Retirement')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
        <br />
        <h5>Baby Shower</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Baby Shower')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
        <br />
        <h5>Anniversary</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Anniversary')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
        <br />
        <h5>Farewell</h5>
        <div>
          <Row>
            {props.cardTemplates
              .filter(cardTemplate => cardTemplate.occasion === 'Farewell')
              .map(cardTemplate => (
                <div
                  className={
                    props.selected.id === cardTemplate.id
                      ? 'selected-template'
                      : 'template'
                  }
                  key={cardTemplate.id}
                  onClick={() =>
                    props.selectCardTemplate('cardTemplate', cardTemplate)
                  }
                >
                  <Col>
                    <img src={cardTemplate.picture} height="140" width="120" />
                  </Col>
                </div>
              ))}
          </Row>
        </div>
      </Container>
      <div className="footer">
        * Card templates from{' '}
        <a href="https://www.greetingsisland.com/">Greetings Island</a>
      </div>
    </div>
  )
}

export default CardTemplates
