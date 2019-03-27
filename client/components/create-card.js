import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCardTemplatesThunk, createNewCardThunk} from '../store'
import {VideoUpload, CardTemplates, CardMessage, ConfirmCard} from '.'
import {Tab, Row, Col, Nav} from 'react-bootstrap'

class CreateCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardTemplate: {},
      message: '',
      video: {}
    }
    this.submitCard = this.submitCard.bind(this)
    this.updateCard = this.updateCard.bind(this)
  }

  componentDidMount() {
    console.log('State: ', this.state)
    this.props.getAllCardTemplates()
  }

  updateCard(cardProp, newValue) {
    const newState = Object.assign(this.state, {[cardProp]: newValue})
    console.log('IM UPDATED: ', newState)
    this.setState(newState)
  }

  submitCard() {
    const cardData = new FormData()
    cardData.append('cardTemplateId', this.state.cardTemplate.id)
    cardData.append('message', this.state.message)
    cardData.append('video', this.state.video)
    this.props.confirmCard(cardData)
  }

  render() {
    return (
      <div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="select-template"
        >
          <Row>
            <Col sm={3}>
              <Nav variant="tabs" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="select-template">
                    Choose Your Card
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="write-message">
                    Write Your Message
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="upload-video">Upload Your Video</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="confirm">Review</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="select-template">
                  <CardTemplates
                    cardTemplates={this.props.cardTemplates}
                    selectCardTemplate={this.updateCard}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="write-message">
                  <CardMessage writeMessage={this.updateCard} />
                </Tab.Pane>
                <Tab.Pane eventKey="upload-video">
                  <VideoUpload addVideo={this.updateCard} />
                </Tab.Pane>
                <Tab.Pane eventKey="confirm">
                  <ConfirmCard
                    cardTemplate={this.state.cardTemplate}
                    message={this.state.message}
                    video={this.state.video}
                    submitCard={this.submitCard}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardTemplates: state.card.cardTemplates
})

const mapDispatchToProps = dispatch => ({
  getAllCardTemplates: () => dispatch(getAllCardTemplatesThunk()),
  confirmCard: data => dispatch(createNewCardThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard)
