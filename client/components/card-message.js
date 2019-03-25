import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setNewCardMessage} from '../store'

class cardMessage extends Component {
  constructor(props) {
    super(props)
    this.writeMessage = this.writeMessage.bind(this)
  }

  writeMessage(evt) {
    evt.preventDefault()
    evt.target.message.value === 'Your Message (optional)'
      ? this.props.createMessage('')
      : this.props.createMessage(evt.target.message.value)
  }

  render() {
    return (
      <div>
        <h2>Write Your Message</h2>
        <div>
          <form onSubmit={this.writeMessage}>
            <textarea name="message" rows="5" cols="50" maxLength="160">
              Your Message (optional)
            </textarea>
            <br />
            <button type="submit">Submit</button>
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
