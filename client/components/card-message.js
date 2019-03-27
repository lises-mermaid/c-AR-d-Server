import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setNewCardMessage} from '../store'
import Button from 'react-bootstrap/Button'

class cardMessage extends Component {
  constructor(props) {
    super(props)
    this.writeMessage = this.writeMessage.bind(this)
  }

  writeMessage(evt) {
    evt.preventDefault()
    this.props.createMessage(evt.target.message.value)
  }

  render() {
    return (
      <div>
        <h2>Write Your Message</h2>
        <div>
          <form onSubmit={this.writeMessage}>
            <textarea
              name="message"
              rows="4"
              cols="40"
              maxLength="160"
              placeholder="Your Message (optional)"
            />
            <br />
            <Button type="submit" variant="flat">
              Submit
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(setNewCardMessage(message))
})

export default connect(null, mapDispatchToProps)(cardMessage)
