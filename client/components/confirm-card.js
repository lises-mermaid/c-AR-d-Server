import React from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

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
      <div>
        <div>
          {this.state.isLoading ? (
            <div>
              <Spinner animation="border" variant="primary">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <p> Your Card is being created!</p>
            </div>
          ) : (
            <Button
              variant="flat"
              type="submit"
              onClick={evt => {
                evt.preventDefault()
                this.props.submitCard()
                this.setState({isLoading: true})
              }}
            >
              Create Card
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default ConfirmCard
