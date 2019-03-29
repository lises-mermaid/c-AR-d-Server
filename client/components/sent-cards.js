import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllSentCardsThunk} from '../store'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'

class SentCards extends Component {
  componentDidMount() {
    this.props.getPastCards()
  }

  render() {
    return (
      <div>
        <h2>Card History</h2>
        <div>
          {this.props.sentCards.map(card => (
            <div key={card.uuid} className="sent-cards">
              <Media>
                <img
                  src={card.cardTemplate.picture}
                  height="140"
                  width="120"
                  className="align-self-center mr-3"
                />
                <Media.Body>
                  {card.message ? <p>message: "{card.message}"</p> : <br />}
                  <p>
                    <a href={card.video}>video</a>
                  </p>
                  <p>{card.createdAt.slice(0, 10)}</p>
                  <Link to={`/cards/${card.uuid}`}>
                    <Button>Print Your Card</Button>
                  </Link>
                </Media.Body>
              </Media>
              <br />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sentCards: state.card.sentCards
})

const mapDispatchToProps = dispatch => ({
  getPastCards: () => dispatch(getAllSentCardsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SentCards)
