import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleCardThunk} from '../store'
import Button from 'react-bootstrap/Button'

class SingleCard extends Component {
  componentDidMount() {
    this.props.getSingle(this.props.match.params.uuid)
  }

  render() {
    let singleCard = this.props.singleCard
    return (
      <div className="single-card">
        <h2>Print your Card!</h2>
        <h4>
          Once printed be sure to hand to your recipient! Once they have the
          card, they can view the card with our mobile app <b>c-AR-d</b>!
        </h4>
        <div className="image-to-print">
          <img src={singleCard.link} alt="Your Card" height="500" />
          <Button type="button">Print Card</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleCard: state.card.singleCard
})

const mapDispatchToProps = dispatch => ({
  getSingle: cardUUID => dispatch(getSingleCardThunk(cardUUID))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard)
