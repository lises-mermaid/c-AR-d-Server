import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewCardThunk} from '../store'
import Button from 'react-bootstrap/Button'

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
    console.log('STATE: ', this.state)
    return (
      <div>
        <h3>Review Card</h3>
        <h5>{this.state.cardTemplate.occasion}</h5>
        <img src={this.state.cardTemplate.picture} width="120" />
        <label>Message</label>
        <textarea
          name="message"
          rows="4"
          cols="40"
          maxLength="160"
          onChange={this.handleChange}
          placeholder={this.state.message}
        />
        <label>Video</label>
        <br />
        <div>
          <Button variant="flat" type="submit" onClick={this.handleSubmit}>
            Create Card
          </Button>
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
