import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class ConfirmCard extends Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false}
  }
  render() {
    return (
      <div>
        <h3>Review Card</h3>
        <h5>{this.props.cardTemplate.occasion}</h5>
        <img src={this.props.cardTemplate.picture} width="120" />
        <br />
        <label>Message</label>
        <div>{this.props.message}</div>
        <br />
        <label>Video</label>
        <div>{this.props.video.name}</div>
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
  }
}
export default ConfirmCard
