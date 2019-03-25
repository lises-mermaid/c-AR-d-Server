import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllSentCardsThunk} from '../store'

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
            <div key={card.uuid}>
              <img src={card.cardTemplate.picture} height="140" width="120" />
              {card.message ? <p>message: "{card.message}"</p> : <br />}
              <p>video: {card.video}</p>
              <p>{card.createdAt.slice(0, 10)}</p>
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
