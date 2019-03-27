import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleCard, getAllSentCardsThunk} from '../store'

class FinishedCardView extends Component {
  componentDidMount() {
    //this.props.getSentCards()
    this.props.getSingle()
  }

  render() {
    let singleCard = this.props.singleCard
    console.log('HELLO', singleCard, 'HELLO')
    return (
      <div>
        <h2>Print your Card!</h2>
        <h4>
          {' '}
          Once printed be sure to hand to your recipient! Once they have the
          card, they can view the card with our mobile app <b>c-AR-d</b>!{' '}
        </h4>
        {'TESTING'}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleCard: state.singleCard
})

const mapDispatchToProps = dispatch => ({
  getSentCards: () => dispatch(getAllSentCardsThunk()),
  getSingle: () => dispatch(getSingleCard())
})

export default connect(mapStateToProps, mapDispatchToProps)(FinishedCardView)
