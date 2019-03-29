import React from 'react'
import Button from 'react-bootstrap/Button'

const CardMessage = props => (
  <div>
    <h2>Write Your Message</h2>
    <div>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          props.writeMessage('message', evt.target.message.value)
        }}
      >
        <textarea
          name="message"
          rows="4"
          cols="40"
          maxLength="160"
          placeholder="Your Message (optional)"
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  </div>
)

export default CardMessage
