import React from 'react'
import Button from 'react-bootstrap/Button'

const ConfirmCard = props => (
  <div>
    <h3>Review Card</h3>
    <h5>{props.cardTemplate.occasion}</h5>
    <img src={props.cardTemplate.picture} width="120" />
    <label>Message</label>
    <div>{props.message}</div>
    <label>Video</label>
    <br />
    <div>
      <Button
        variant="flat"
        type="submit"
        onClick={evt => {
          evt.preventDefault()
          props.submitCard()
        }}
      >
        Create Card
      </Button>
    </div>
  </div>
)

export default ConfirmCard
