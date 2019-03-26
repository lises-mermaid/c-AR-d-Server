import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewCardThunk} from '../store'

class ConfirmCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardTemplate: {},
      message: '',
      video: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      cardTemplate: this.props.cardTemplate,
      message: this.props.message,
      video: this.props.video
    })
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({...this.state, message: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const cardData = new FormData()
    cardData.append('cardTemplateId', this.state.cardTemplate.id)
    cardData.append('message', this.state.message)
    cardData.append('video', this.state.video)
    this.props.confirmCard(cardData)
  }

  render() {
    return (
      <div>
        <h3>Review Card</h3>
        <h5>{this.state.cardTemplate.occasion}</h5>
        <img src={this.state.cardTemplate.picture} />
        <label>Message</label>
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <label>Video</label>
        <br />
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            Create Card
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardTemplate: state.card.newCardTemplate,
  message: state.card.newCardMessage,
  video: state.card.newCardVideo
})

const mapDispatchToProps = dispatch => ({
  confirmCard: data => dispatch(createNewCardThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCard)
